FROM python:3.7-slim

RUN apt-get update
RUN apt-get install libglib2.0-0 libsm6 libxrender1 libxext6 libgl1-mesa-glx -y

RUN mkdir -p /var/log/celery/ /var/run/celery/
RUN addgroup celery && \
  adduser --disabled-password --gecos "" --ingroup celery --no-create-home celery && \
  chown celery:celery /var/run/celery/ && \
  chown celery:celery /var/log/celery/

ENV INSTALL_PATH /flask_backend
RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP=api.manage

CMD gunicorn -b 0.0.0.0:8000 --access-logfile - "api.app:create_app()"
