from database import db
from models.profession import Profession
from flask_marshmallow import Marshmallow
from models.section import Section

from schemas.vacancy import vacancies_schema
from schemas.jobless import joblesses_schema
from schemas.havejob import havejobs_schema
ma = Marshmallow()

class SectionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Section
    id = ma.auto_field()
    name = ma.auto_field()
    vacancies = ma.Nested(vacancies_schema)
    joblesses = ma.Nested(joblesses_schema)
    havejobs = ma.Nested(havejobs_schema)

section_schema = SectionSchema()
sections_schema = SectionSchema(many=True)