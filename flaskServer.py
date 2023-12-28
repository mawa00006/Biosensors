"""
 @author Mattes Warning
 @author Jan Früh

"""
from flask import Flask, render_template, redirect, url_for, request
import random
import json
import csv

# Create a Flask web application instance
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True


# Define the root route, which redirects to the 'base' route
@app.route('/')
def index():
    return redirect(url_for('base'))


# Define the 'base' route, which renders the 'base.html' template
@app.route('/base')
def base():
    return render_template('base.html')


# Define the 'steps' route, which renders the 'steps.html' template
@app.route('/steps')
def steps():
    return render_template('steps.html', data="'static/filled_biosensors.csv'")


# Define the 'calories' route, which renders the 'calories.html' template
@app.route('/calories')
def calories():
    return render_template('calories.html', data="'static/filled_biosensors.csv'")


# Define the 'heartrate' route, which renders the 'heartrate.html' template
@app.route('/heartrate')
def heartrate():
    return render_template('heartrate.html', data="'static/filled_biosensors.csv'")


# Define the 'temperature' route, which renders the 'temperature.html' template
@app.route('/temperature')
def temperature():
    return render_template('temperature.html', data="'static/filled_biosensors.csv'")


if __name__ == '__main__':
    app.run(debug=True, port=5000)
