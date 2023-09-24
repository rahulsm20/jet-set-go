FROM python:3.10-alpine

RUN apk update && \
    apk add --no-cache libjpeg-turbo-dev zlib-dev libffi-dev gcc musl-dev libressl-dev

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD ["gunicorn", "--config", "gunicorn_config.py", "jet_set_go.wsgi:application"]