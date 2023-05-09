import sys
import time
import pyrebase
import RPi.GPIO as GPIO
import threading
import queue
from hcsr04sensor import sensor

config = {
  "apiKey": "AIzaSyD6svOYrsv18vruhGY-YGk5iQcHEQoU0Rs",
  "authDomain": "smartbrew-1337.firebaseapp.com",
  "databaseURL": "https://smartbrew-1337-default-rtdb.europe-west1.firebasedatabase.app/",
  "projectId": "smartbrew-1337",
  "storageBucket": "smartbrew-1337.appspot.com"
}


# get a reference to the firebase app
firebase = pyrebase.initialize_app(config)
print("firebase reference acquired, app initialized")

# get a reference to the database
db = firebase.database()
print("database reference acquired")

# configure GPIO
relay_pin = 14
GPIO.setmode(GPIO.BCM)
GPIO.setup(relay_pin, GPIO.OUT, initial=GPIO.LOW)

trig_pin = 27
echo_pin = 6
hcsr04 = sensor.Measurement(trig_pin, echo_pin)

# function executes when the stream object sees a change in the database
def stream_handler(message):
    """Handles the data read from the firebase database when a change occurs."""
    print(message)
    if message["event"] == "patch":
        try:
            if message["data"]["brewingstatus"]:
                if db.child("users").child("fredrik").child("waterLevel").get().val() > 0:
                    print("turn on")
                    GPIO.output(relay_pin, GPIO.HIGH)
                else:
                    print("refill water")
                    db.child("users").child("fredrik").update({"brewingstatus": False})
            
            elif not message["data"]["brewingstatus"]:
                GPIO.output(relay_pin, GPIO.LOW)
                print("statusflag = false")
        except Exception as e:
            print(e)

# function handles reading of HC-SR04 sensor and updating database value
# parameter: reference to database
def water_level_handler(water_event):
    """Reads HC-SR04 sensor and sends the read data to firebase database."""
    depth = hcsr04.raw_distance()

    print("water thread started, depth: {}".format(round(depth, 1)))
    while not water_event.is_set():
        try:
            distance = hcsr04.raw_distance()
        except Exception as e:
            print(e)
            distance = 0
            while distance == 0:
                distance = hcsr04.raw_distance()

        distance = round(distance, 1) 
        print("{}".format(distance))
        water_level_percentage = get_water_level_percentage(distance, depth)
        db.child("users").child("fredrik").update({"waterLevel": water_level_percentage})
        if water_level_percentage <= 0:
            db.child("users").child("fredrik").update({"brewingstatus": False})
            print("not enough water, stopped")
        time.sleep(4)

def get_water_level_percentage(distance, depth=10):
    """Returns a percentage of the measured distance """
    water_level = depth - distance
    water_level_percentage = round((water_level / depth) * 100, 0)
    if water_level_percentage < 0:
        water_level_percentage = 0
    return water_level_percentage


#def main_handler(stop_event):
#    """"""
#    print("main handler started")
#    gpio_state = False
#
#    while True:
#        while statusflag:
#            print("statusflag true")
#            if stop_event.is_set():
#                print("stop event set")
#                break
#            # on state
#            if not gpio_state:
#                print("gpio turn on")
#                gpio_state = True
#                GPIO.output(relay_pin, GPIO.HIGH)
#        while not statusflag:
#            print("statusflag false")
#            if stop_event.is_set():
#                print("stop event set")
#                break
#            # off state
#            if gpio_state:
#                print("gpio turn off")
#                gpio_state = False
#                GPIO.output(relay_pin, GPIO.LOW)


def main():
    """Main function, program starts and runs here."""
    
    
    
    #global water_level_q = queue.Queue()

    # stop_event is a flag for when the program should shut off
    #main_event = threading.Event()
    #main_thread = threading.Thread(target=main_handler, args=[main_event])
    #main_thread.start()

    water_event = threading.Event() 
    water_thread = threading.Thread(target=water_level_handler, args=[water_event])
    water_thread.start()

    data_stream = db.child("users").child("fredrik").stream(stream_handler)
    # listen for value changes
    print("stream opened, listening for database changes")

    while True:
        try:
            if input("write 'exit' to stop program or press Ctrl+C\n") == "exit":
                data_stream.close()
                print("stream closed")
                water_event.set()
                #main_event.set()
                water_thread.join()
                #main_thread.join()
                print("water thread stopped")
                GPIO.cleanup()
                print("GPIO cleaned up")
                sys.exit(130)
        except KeyboardInterrupt:
            data_stream.close()
            print("stream closed")
            water_event.set()
            #main_event.set()
            water_thread.join()
            #main_thread.join()
            print("water thread stopped")
            GPIO.cleanup()
            print("GPIO cleaned up")
            sys.exit(130)

if __name__ == "__main__":
    main()
