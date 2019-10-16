from flask import Flask, request
from flask_cors import CORS
import json
import data 
app = Flask(__name__)

#Allow cross-origin
CORS(app)

@app.route('/')
def index():
  result = data.get_data(request.args.get('id', default="INF117", type= str), "32019")
  def obj_dict(obj):
    return obj.__dict__
  return json.dumps(result, default = obj_dict)
  
@app.route('/greet')
def say_hello():
  return 'Hello from Server'
