SHELL := /bin/bash

run:
	python manage.py runserver
migrate:
	python manage.py makemigrations
	python manage.py migrate
activate:
	source ./env/bin/activate
docker:
	docker build -t jetsetgo-api .
	docker run -p 8000:8000 jetsetgo-api
compose:
	docker-compose build
	docker-compose up -d
