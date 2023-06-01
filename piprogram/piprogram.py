import sys
import time
import pyrebase
import RPi.GPIO as GPIO
import threading
from hcsr04sensor import sensor

# firebase api config data
config = {
  "apiKey": "<API_KEY_HERE>",
  "authDomain": "<AUTHDOMAIN_HERE>",
  "databaseURL": "<DATABASE_URL_HERE>",
  "projectId": "<PROJECT_ID_HERE>",
  "storageBucket": "<STORAGE_BUCKET_HERE>"
}

# get a reference to the firebase app
while True:
    try:
        firebase = pyrebase.initialize_app(config)
        break
    except Exception as e:
        print("error trying to initialize firebase app")
        time.sleep("5")

print("firebase reference acquired, app initialized")

# get a reference to the firebase database
db = firebase.database()
print("database reference acquired")

# configure GPIO
relay_pin = 14
GPIO.setmode(GPIO.BCM)
GPIO.setup(relay_pin, GPIO.OUT, initial=GPIO.LOW)

# set up sensor object
sample_size = 18
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

def water_level_handler(water_event):
    """Reads HC-SR04 sensor and sends the read data to firebase database."""
    depth = hcsr04.raw_distance(sample_size)
    print("water thread started, depth: {}".format(round(depth, 1)))
    distance = 0
    while not water_event.is_set():
        try:
            distance = hcsr04.raw_distance(sample_size)
        except Exception as e:
            print(e)
            while distance == 0:
                distance = hcsr04.raw_distance(sample_size)

        distance = round(distance, 1) 
        print("{}".format(distance))
        water_level_percentage = get_water_level_percentage(distance, depth)
        db.child("users").child("fredrik").update({"waterLevel": water_level_percentage})
        time.sleep(1)

def get_water_level_percentage(distance, depth=10):
    """Calculates a percentage based of a reading and a given depth."""
    water_level = depth - distance
    water_level_percentage = round((water_level / (depth-2)) * 100, 0)
    if water_level_percentage < 0:
        water_level_percentage = 0
    return water_level_percentage

def main():
    """Main function, program starts and runs here."""

    # start a thread that handles reading ultrasonic distance sensor data and writing it to firebase
    water_event = threading.Event() 
    water_thread = threading.Thread(target=water_level_handler, args=[water_event])
    water_thread.start()

    # listen for database value changes
    while True:
        try:
            data_stream = db.child("users").child("fredrik").stream(stream_handler)
            break
        except Exception as e:
            print("error trying to open database stream, trying again in 5 seconds...")
            time.sleep(5)
    print("stream opened, listening for database changes")

    # do nothing until a user writes exit or keyboard interrupts
    while True:
        try:
            if input("enter 'exit' to stop program or press Ctrl+C/Z\n") == "exit":
                data_stream.close()
                print("stream closed")
                water_event.set()
                water_thread.join()
                print("water thread stopped")
                GPIO.cleanup()
                print("GPIO cleaned up")
                sys.exit(130)
        except KeyboardInterrupt as e:
            print(e)
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
