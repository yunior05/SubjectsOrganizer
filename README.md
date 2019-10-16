#Steps to set up the data api
`pip install Flask`
// or
`py -m pip install Flask`

`cd src/sandbox`
`py -m venv venv`

On linux: 

`. venv/bin/activate`

`export FLASK_ENV=development`

`export FLASK_APP=app.py`

On Windows

`cd Scripts`
`activate`

`set FLASK_ENV=development`

`set FLASK_APP=app.py`

Run 
`flask run` //or `py -m flask run`

The port is 5000.
