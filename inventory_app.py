from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return """
        <html>
            <head>
                <title></title>
            </head>
        

        </html>
        """