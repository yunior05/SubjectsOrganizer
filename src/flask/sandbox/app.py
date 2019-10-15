from flask import Flask, jsonify
import json
import data 
app = Flask(__name__)

@app.route('/')
def index():
#   data.printData('INF117')
  result = data.get_data('ESP301')
  def obj_dict(obj):
    return obj.__dict__
  return json.dumps(result, default = obj_dict)
  
@app.route('/greet')
def say_hello():
  return 'Hello from Server'