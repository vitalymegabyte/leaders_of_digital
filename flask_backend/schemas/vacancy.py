from database import db
from flask_marshmallow import Marshmallow
from models.vacancy import Vacancy

from schemas.profession import profession_schema
ma = Marshmallow()

class VacancySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Vacancy
    id = ma.auto_field()
    section = ma.auto_field()
    year = ma.auto_field()
    number = ma.auto_field()
    profession = ma.Nested(profession_schema)

vacancy_schema = VacancySchema()
vacancies_schema = VacancySchema(many=True)
    