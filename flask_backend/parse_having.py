import pandas as pd
import numpy as np
from main import app, db
import re
from models.section import Section
from models.havejob import HaveJob
from sqlalchemy.orm.collections import InstrumentedList
import sys

def int_try_parse(e):
    try:
        return int(e)
    except:
        return False

if __name__ == "__main__":
    app.app_context().push()
    data = pd.read_excel("/Data/Численность занятых 2017-2018.xlsx", sheet_name='labour_okved')
    print(data[data.columns[0]].size)
    lst = []
    col2017 = 0
    col2018 = 0
    currentSection = None
    for i in range(1, data[data.columns[0]].size):
        #if data[summaryCol][i] != 
        result = None
        for c in data.columns:
            if (not pd.isnull(data[c][i])) and int_try_parse(data[c][0]) != False:
                year = int_try_parse(data[c][0])
                have_job = HaveJob(section=currentSection, number=int(data[c][i]), year=year)
                db.session.add(have_job)
                print(have_job)
            elif not pd.isnull(data[c][i]):
                sys.stdout.flush()
                section = Section.query.filter(Section.name.like('%' + data[c][i][:1] + '%')).first()
                if not section:
                    section = Section(name=data[c][i])
                currentSection = section
        #lst.append(obj)
    db.session.commit()
    #print(lst)