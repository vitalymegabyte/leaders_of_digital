from database import db
from models.vacancy import Vacancy
from models.jobless import Jobless
from models.havejob import HaveJob

class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    vacancies = db.relationship('Vacancy', backref='section', lazy='dynamic')
    joblesses = db.relationship('Jobless', backref='section', lazy='dynamic')
    havejob = db.relationship('HaveJob', backref='section', lazy='dynamic')