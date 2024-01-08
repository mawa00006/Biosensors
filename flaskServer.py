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
    return render_template('base.html', data="'static/small_biosensors.csv'")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
