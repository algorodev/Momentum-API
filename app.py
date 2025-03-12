from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Hello, World!"

@app.route('/greeting/<name>', methods=['GET'])
def greeting(name):
    return 'Hello, ' + name + '!'

if __name__ == '__main__':
    app.run(debug=True)
