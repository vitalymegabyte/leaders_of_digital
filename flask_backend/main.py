from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from database import db
from flask_cors import CORS, cross_origin

from models.section import Section
from models.profession import Profession
from models.vacancy import Vacancy

from schemas.section import section_schema, sections_schema
from schemas.vacancy import vacancy_schema, vacancies_schema
from schemas.havejob import havejob_schema, havejobs_schema
from schemas.jobless import jobless_schema, joblesses_schema
from schemas.profession import profession_schema, professions_schema

from flask_restful import reqparse

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://vitaly:12345678@db/cadre?charset=utf8'
cors = CORS(app)

db.init_app(app)
migrate = Migrate(app, db)


@app.route('/')
@cross_origin()
def main_page():
    return 'This is a main page'

@app.route('/section', methods=['GET', 'OPTIONS'])
@cross_origin()
def show_section():
    sections = Section.query.all()
    response = jsonify(sections_schema.dump(sections))
    return response
    
@app.route('/professions', methods=['GET', 'OPTIONS'])
@cross_origin()
def show_professions():
    parser = reqparse.RequestParser()
    parser.add_argument("section_id", default=None)
    args = parser.parse_args()
    if args['section_id'] == None:
        professions = Profession.query.all()
        response = jsonify(professions_schema.dump(professions))
        return response
    else:
        professions = []
        section = Section.query.get(args["section_id"])
        for jobless in section.joblesses:
            professions.append(jobless.profession)
        for vacancy in section.vacancies:
            if not vacancy.profession in professions:
                professions.append(vacancy.profession)
        
        professions_output = professions_schema.dump(professions)
        return jsonify(professions_output)