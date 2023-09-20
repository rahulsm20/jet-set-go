# Jet Set Go <img src="client/public/plane_icon_white.png" alt="drawing" width="20"/>

- Index
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
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
  * AWS Lambda + S3 Bucket + API Gateway (Serverless Framework)

### Architecture
![jet-set-go_arch](https://github.com/rahulsm20/jet-set-go/assets/77540672/fd97900d-bfbf-4c21-8979-35b1be9c546c)

### Screenshots
![signup-page](https://github.com/rahulsm20/jet-set-go/assets/77540672/23e3aedb-c988-4f65-992a-330231e2c373)

![homepage](https://github.com/rahulsm20/jet-set-go/assets/77540672/528e8360-b0b7-46df-bf5e-5eb98b010894)

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
    - Add an environment variables in a .env file at the root of the folder 
      with the following values
      ```
      API_KEY = {API_KEY}
      DB_USER = {DATABASE_USER}
      DB_PASS = {DATABASE_PASSWORD}
      DB_HOST = {DATABASE_HOST}
      DB_NAME = {DATABASE_NAME}
      DJANGO_SECRET = {DJANGO_SECRET_KEY}
      FLIGHT_API_KEY = {API_KEY}
      ``` 
    - Run 
      ```
      make run 
      ```  
      -> runs python manage.py runserver
    
