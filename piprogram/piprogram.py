import sys
import time
import pyrebase
import RPi.GPIO as GPIO
import threading
from hcsr04sensor import sensor

# firebase api config data
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

# get a reference to the firebase database
db = firebase.database()
print("database reference acquired")

# configure GPIO
relay_pin = 14
GPIO.setmode(GPIO.BCM)
GPIO.setup(relay_pin, GPIO.OUT, initial=GPIO.LOW)

# set up sensor object
trig_pin = 27
echo_pin = 6
hcsr04 = sensor.Measurement(trig_pin, echo_pin)

# function executes when the stream object sees a change in the database
def stream_handler(message):
    """Handles a message from the firebase database."""
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
                print("turn off")
                GPIO.output(relay_pin, GPIO.LOW)
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
    """Calculates a percentage based of a reading and a given depth."""
    water_level = depth - distance
    water_level_percentage = round((water_level / depth) * 100, 0)
    if water_level_percentage < 0:
        water_level_percentage = 0
    return water_level_percentage

def main():
    """Main function, program starts and runs here."""

    # start a thread that handles reading ultrasonic distance sensor data and writes it to firebase
    water_event = threading.Event() 
    water_thread = threading.Thread(target=water_level_handler, args=[water_event])
    water_thread.start()

    # listen for value changes
    data_stream = db.child("users").child("fredrik").stream(stream_handler)
    print("stream opened, listening for database changes")

    # do nothing until a user writes exit or keyboard interrupts
    while True:
        try:
            if input("write 'exit' to stop program or press Ctrl+C\n") == "exit":
                data_stream.close()
                print("stream closed")
                water_event.set()
                water_thread.join()
                print("water thread stopped")
                GPIO.cleanup()
                print("GPIO cleaned up")
                sys.exit(130)
        except KeyboardInterrupt:
            data_stream.close()
            print("stream closed")
            water_event.set()
            water_thread.join()
            print("water thread stopped")
            GPIO.cleanup()
            print("GPIO cleaned up")
            sys.exit(130)

if __name__ == "__main__":
    main()
