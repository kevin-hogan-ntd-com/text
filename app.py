from flask import Flask, request, Response
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/sms", methods=["POST"])
def sms_reply():
    incoming_msg = request.form.get('Body', '')
    print("Got SMS:", incoming_msg)

    resp = MessagingResponse()
    resp.message("message received")

    return Response(str(resp), mimetype="application/xml")

@app.route("/", methods=["GET"])
def root():
    return "OK"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)
