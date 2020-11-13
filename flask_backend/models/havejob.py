from database import db
from models.profession import Profession

class HaveJob(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
        nullable=False)
    year = db.Column(db.Integer)
    number = db.Column(db.Integer)