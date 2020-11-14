from database import db
from models.profession import Profession
from flask_marshmallow import Marshmallow
from models.havejob import HaveJob
ma = Marshmallow()

class HaveJobSchema(ma.SQLAlchemySchema):
    class Meta:
        model = HaveJob
    id = ma.auto_field()
    section = ma.auto_field()
    year = ma.auto_field()
    number = ma.auto_field()

havejob_schema = HaveJobSchema()
havejobs_schema = HaveJobSchema(many=True)