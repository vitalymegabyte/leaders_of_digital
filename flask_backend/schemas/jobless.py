from database import db
from models.profession import Profession
from flask_marshmallow import Marshmallow
from models.jobless import Jobless

from schemas.profession import profession_schema
ma = Marshmallow()

class JoblessSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Jobless
    id = ma.auto_field()
    section = ma.auto_field()
    profession = ma.Nested(profession_schema)
    year = ma.auto_field()
    number = ma.auto_field()

jobless_schema = JoblessSchema()
joblesses_schema = JoblessSchema(many=True)