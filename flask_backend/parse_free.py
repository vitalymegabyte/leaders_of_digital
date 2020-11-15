import pandas as pd
import numpy as np
from main import app, db
import re
from models.section import Section
from models.profession import Profession
from models.jobless import Jobless
from sqlalchemy.orm.collections import InstrumentedList


def parse(year):
    data = pd.read_excel("/Data/БезработныеНаКонец" + str(year) + ".xlsx", sheet_name='ОКВЭД+Профессия')
    print(data[data.columns[0]].size)
    lst = []
    summaryCol = 0
    vacancyName = 0
    sectionName = 0
    for i in data.columns:
        if data[i][3] == 'Итог':
            summaryCol = i
        elif data[i][3] == 'Группа':
            vacancyName = i
        elif data[i][3] == 'Класс':
            sectionName = i
    print(sectionName, vacancyName, summaryCol)
    currentSection = None
    forbidden = ['Общий итог', 'Класс']
    for i in range(3, data[data.columns[0]].size):
        #if data[summaryCol][i] != 
        result = None
        if not pd.isnull(data[sectionName][i]) and not data[sectionName][i].endswith('Итог') and not data[sectionName][i] in forbidden:
            section = Section.query.filter_by(name=data[sectionName][i]).first()
            if not section:
                section = Section(name=data[sectionName][i].encode())
                db.session.add(section)
            currentSection = section
            print(section.name)
        if not pd.isnull(data[vacancyName][i]):
            result = re.match(r"([А-я -ёЁ\(\)A-z\?;]+) \(([\d]+)\)", data[vacancyName][i])
            #print(result)
            if result:
                obj = [ data[summaryCol][i], result.group(1), int(result.group(2)) ]
                profession = Profession.query.filter_by(name=result.group(1)).first()
                if not profession:
                    profession = Profession(name=result.group(1), id=int(result.group(2)))
                    db.session.add(profession)
                jobless = currentSection.joblesses.filter(Jobless.profession == profession).first()
                if not jobless:
                    jobless = Jobless(profession=profession, number=int(data[summaryCol][i]), year=year)
                    db.session.add(jobless)
                currentSection.joblesses.append(jobless)
                #print(obj)
        #lst.append(obj)
    db.session.commit()
    #print(lst)
    
if __name__ == "__main__":
    app.app_context().push()
    parse(2017)
    parse(2018)
    parse(2019)
    
