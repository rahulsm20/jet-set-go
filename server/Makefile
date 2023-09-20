run:
	python manage.py runserver
migrate:
	python manage.py makemigrations
	python manage.py migrate
activate:
	. venv/bin/activate
docker:
	docker build -t jetsetgo-api .
	docker run -p 8000:8000 jetsetgo-api