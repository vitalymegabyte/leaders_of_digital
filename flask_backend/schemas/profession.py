from database import db
from models.profession import Profession
from flask_marshmallow import Marshmallow
ma = Marshmallow()

class ProfessionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Profession
    id = ma.auto_field()
    name = ma.auto_field()

profession_schema = ProfessionSchema()
professions_schema = ProfessionSchema(many=True)