from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    # This makes '/' show the login page first
    return render_template('login.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/students')
def students():
    return render_template('students.html')

@app.route('/faculty')
def faculty():
    return render_template('faculty_management.html')

@app.route('/courses')
def courses():
    return render_template('courses_management.html')

@app.route('/enrollment')
def enrollment():
    return render_template('enrollment.html')

@app.route('/grades')
def grades():
    return render_template('grades.html')

@app.route('/reports')
def reports():
    return render_template('reports.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

if __name__ == '__main__':
    app.run(debug=True)
