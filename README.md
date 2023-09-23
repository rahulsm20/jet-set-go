# Jet Set Go <img src="client/public/plane_icon_white.png" alt="drawing" width="20"/>

- Index
  - [Tech Stack](#tech-stack)
  - [Screenshots](#screenshots)
  - [Steps to run locally](#steps-to-run-locally)

### Tech Stack

* Frontend
  * React
  * Typescript
  * Vite
  * TailwindCSS

* Backend
  * Python
  * Django
  * Database
    * PostgreSQL 

* Infrastructure
  * Vercel
  * Docker, Redis & S3 Bucket

### Architecture
![travel_arch_final](https://github.com/rahulsm20/jet-set-go/assets/77540672/83bf0b8c-e073-4a99-b44d-399c481a9e55)

### Screenshots
![signup-page](https://github.com/rahulsm20/jet-set-go/assets/77540672/23e3aedb-c988-4f65-992a-330231e2c373)

![homepage](https://github.com/rahulsm20/jet-set-go/assets/77540672/c08586c8-592e-4c61-bce2-c96d918d2ce3)

### Steps to run locally
  - Clone this repository
    ```
      git clone https://github.com/rahulsm20/jet-set-go
    ```
  - Run client 
    - Enter folder
      ```
      cd jet-set-go/client
      ```
    - Add an environment variables in a .env file at the root of the folder 
      with the following values 
       ```
      VITE_HOTEL_API_KEY={YOUR_API_KEY}
      VITE_FLIGHT_API_KEY={YOUR_API_KEY}
      VITE_SERVER_URL=http://localhost:8000
      ```
    - Install packages
      ```
      npm install
      ```
    - Start client
      ```
      npm run dev
      ```
  - Run server
    - Enter folder
      ```
      cd jet-set-go/server
      ```
    - Add an environment variables in a .env file at the root of the folder 
      with the following values
      ```
      API_KEY = {YOUR_API_KEY}
      DB_USER = {YOUR_DATABASE_USER}
      DB_PASS = {YOUR_DATABASE_PASSWORD}
      DB_HOST = {YOUR_DATABASE_HOST}
      DB_NAME = {YOUR_DATABASE_NAME}
      DJANGO_SECRET = {YOUR_DJANGO_SECRET_KEY}
      FLIGHT_API_KEY = {YOUR_API_KEY}
      ``` 
    - Using Docker
      ```
      make docker
      ``` 
      (defaults image name to jetsetgo-api)
      - Else
        ```
        docker build -t <image-name> . 
        docker run -p 8000:8000 <image-name>
        ```
    - Manually
      - Create virtual environment
        ```
        python -m venv venv
        ```
      - Enter virtual environment
        ```
        source venv/bin/activate
        ```
      - Install packages
        ```
        pip install -r requirements.txt
        ```
      - Run 
        ```
        make run 
        ```  
        -> runs python manage.py runserver
      
