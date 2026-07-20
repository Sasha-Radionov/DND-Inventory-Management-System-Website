# import flask class and methods
from flask import Flask, jsonify, request
# create an instance of an app
app = Flask(__name__)

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Hello World!"
    })

if __name__ == "__main__":
    app.run(debug=True)