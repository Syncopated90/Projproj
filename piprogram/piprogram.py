import sys
import time
import pyrebase
import RPi.GPIO as GPIO
import threading
from hcsr04sensor import sensor

config = {
  "apiKey": "AIzaSyD6svOYrsv18vruhGY-YGk5iQcHEQoU0Rs",
  "authDomain": "smartbrew-1337.firebaseapp.com",
  "databaseURL": "https://smartbrew-1337-default-rtdb.europe-west1.firebasedatabase.app/",
  "projectId": "smartbrew-1337",
  "storageBucket": "smartbrew-1337.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
print("database reference acquired")



echo_pin = 6
trig_pin = 27
sample_size = 22
hcsr04 = sensor.Measurement(trig_pin, echo_pin)
stop_event = threading.Event()

# function executes when the stream object sees a change in the database
def stream_handler(message):
    """Handles the data read from the firebase database when a change occurs."""
    print(message)
    print(threading.active_count())
    if message["data"]:
        if hcsr04.raw_distance(18) < 8:
                water_thread = threading.Thread(target=water_level_handler, args=[])
                water_thread.start()
                GPIO.output(14, GPIO.HIGH)
                print("Pin 14: High")

        else:
            print("not enough water")
    else:
        if threading.active_count() > 1:
            stop_event.set()
            water_thread.join()
            stop_event.clear()
        GPIO.output(14, GPIO.LOW)
        print("Pin 14: Low")
        
# function handles reading of HC-SR04 sensor and updating database value
# parameter: reference to database
def water_level_handler():
    """Reads HC-SR04 sensor and sends the read data to firebase database."""
    while not stop_event.is_set():
        try:
            distance = hcsr04.raw_distance(sample_size)
            distance = round(distance, 1)
            print("{}".format(distance)) 
            water_level = 9.5 - distance
            water_level_percentage = round((water_level / 9.5) * 100, 0)
            if water_level_percentage < 0:
                water_level_percentage = 0 
            db.child("users").child("fredrik").update({"waterLevel": water_level_percentage})
            if distance > 9.5:
                GPIO.output(14, GPIO.LOW)   
                print("pin 14: Low") 
                db.child("users").child("fredrik").update({"brewingstatus": False})
                # stop thread here
                stop_event.set()
                break
        except Exception as e:
            print(e)
       
#water_thread = threading.Thread(target=water_level_handler, args=[])         
def main():
    """Main function, program starts and runs here."""

    # get a reference to the firebase app
    print("firebase reference acquired, app initialized")
    
    print("water thread started")

    brewingstatus_stream = db.child("users").child("fredrik").child("brewingstatus").stream(stream_handler)
    # listen for value changes
    print("stream opened, listening for database changes")

    while True:
        try:
            if input("write 'exit' to stop program or press Ctrl+C\n") == "exit":
                brewingstatus_stream.close()
                print("stream closed")
                stop_event.set()
                #water_thread.join()
                #print("water thread stopped")
                GPIO.cleanup()
                print("GPIO cleaned up")
                sys.exit(130)
        except KeyboardInterrupt:
            brewingstatus_stream.close()
            print("stream closed")
            stop_event.set()
            #water_thread.join()
            #print("water thread stopped")
            GPIO.cleanup()
            print("GPIO cleaned up")
            sys.exit(130)

if __name__ == "__main__":
    # configure GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(14, GPIO.OUT, initial=GPIO.LOW)
    main()
