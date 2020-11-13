from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from database import db
from models.section import Section
from models.profession import Profession
from models.vacancy import Vacancy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://vitaly:12345678@db/cadre'

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def hello_world():
    return 'Hello, World!'