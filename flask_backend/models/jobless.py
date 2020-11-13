from database import db
from models.profession import Profession


class Jobless(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    profession = db.relationship("Profession", uselist=False)
    profession_id = db.Column(db.Integer, db.ForeignKey('profession.id'),
        nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
        nullable=False)
    year = db.Column(db.Integer)

    number = db.Column(db.Integer)