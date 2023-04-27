import pyrebase
import RPi.GPIO as GPIO

config = {
  "apiKey": "AIzaSyD6svOYrsv18vruhGY-YGk5iQcHEQoU0Rs",
  "authDomain": "smartbrew-1337.firebaseapp.com",
  "databaseURL": "https://smartbrew-1337-default-rtdb.europe-west1.firebasedatabase.app/",
  "projectId": "smartbrew-1337",
  "storageBucket": "smartbrew-1337.appspot.com"
}

# function executes when stream method 
def stream_handler(message):
    print(message["data"])
    if message["data"]:
        GPIO.output(14, GPIO.HIGH)
    else:
        GPIO.output(14, GPIO.LOW)

def main():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(14, GPIO.OUT)

    firebase = pyrebase.initialize_app(config)
    print("firebase initialized")

    db = firebase.database()
    print("database set")

    #listen for value changes
    print("listening for database changes")


    try:
        data_stream = db.child("users").child("fredrik").child("brewingstatus").stream(stream_handler)
    except KeyboardInterrupt:
        print("interrupt called")
        try: 
            data_stream.close()    
            GPIO.cleanup()
            sys.exit(130)
        except SystemExit:
            os._exit(130)

if __name__ == "__main__":
    main()
