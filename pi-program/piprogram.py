import sys
import time
import pyrebase
import RPi.GPIO as GPIO
import threading
from hcsr04sensor import sensor as hcsr04

config = {
  "apiKey": "AIzaSyD6svOYrsv18vruhGY-YGk5iQcHEQoU0Rs",
  "authDomain": "smartbrew-1337.firebaseapp.com",
  "databaseURL": "https://smartbrew-1337-default-rtdb.europe-west1.firebasedatabase.app/",
  "projectId": "smartbrew-1337",
  "storageBucket": "smartbrew-1337.appspot.com"
}

# function executes when the stream object sees a change in the database
def stream_handler(message):
    """Handles the data read from the firebase database when a change occurs."""

    print(message)
    if message["data"]:
        GPIO.output(14, GPIO.HIGH)
        print("Pin 14: High")
        # stream handler does not have a reference to the firebase app
        # db.child("users").child("fredrik").child("brewingstatus").update("true")
    else:
        GPIO.output(14, GPIO.LOW)
        print("Pin 14: Low")
        # db.child("users").child("fredrik").child("brewingstatus").update("false")

# function handles reading of HC-SR04 sensor and updating database value
# parameter: reference to database
def water_level_handler(database, stop_event):
   """Reads HC-SR04 sensor and sends the read data to firebase database."""
   echo = 6
   trig = 27
   x = hcsr04.Measurement
   while not stop_event.is_set():
       distance = x.basic_distance(trig, echo)
       print("{}".format(distance))
       database.child("users").child("fredrik").update({"waterLevel": distance})
       time.sleep(4)
         
def main():
    """Main function, program starts and runs here."""
    # configure GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(14, GPIO.OUT, initial=GPIO.LOW)

    # get a reference to the firebase app
    firebase = pyrebase.initialize_app(config)
    print("firebase reference acquired, app initialized")
    
    # get a reference to the database
    db = firebase.database()
    print("database reference acquired")

    stop_event = threading.Event()
    water_thread = threading.Thread(target=water_level_handler, args=[db, stop_event])
    water_thread.start()
    print("water thread started")

    data_stream = db.child("users").child("fredrik").child("brewingstatus").stream(stream_handler)
    # listen for value changes
    print("stream opened, listening for database changes")

    while True:
        try:
            if input("write 'exit' to stop program or press Ctrl+C\n") == "exit":
                data_stream.close()
                print("stream closed")
                stop_event.set()
                water_thread.join()
                print("water thread stopped")
                GPIO.cleanup()
                print("GPIO cleaned up")
                sys.exit(130)
        except KeyboardInterrupt:
            data_stream.close()
            print("stream closed")
            stop_event.set()
            water_thread.join()
            print("water thread stopped")
            GPIO.cleanup()
            print("GPIO cleaned up")
            sys.exit(130)

if __name__ == "__main__":
    main()
