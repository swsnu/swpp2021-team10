# SWPP team 10
[![Build Status](https://travis-ci.com/swsnu/swpp2021-team10.svg?branch=master)](https://travis-ci.com/github/swsnu/swpp2021-team10)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team10&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team10)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team10/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2021-team10?branch=master)

# How to run  
## Frontend

```docker
cd frontend/connectoon
yarn install
yarn start
```

## Backend

```docker
cd backend/connectoon
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```


# How to test  
## Frontend  
### Unit Test

```docker
cd frontend/connectoon
yarn test --coverage --watchAll=false
```

## Backend  
### Unit Test

```docker
cd backend/connectoon
coverage run --branch --source="." manage.py test
coverage report
```

# How to Deploy

## Frontend

### Docker & nginx
```docker
docker build -t frontend .
docker run -p 443:443 -v '/etc/letsencrypt:/etc/letsencrypt' --rm -d --name frontend_container frontend
```

## Backend

### Docker & uwsgi

```docker
docker build -t backend .
docker run -it -p 0.0.0.0:8000:8000 --name backend_container backend:latest /bin/bash
uwsgi --wsgi-file connectoon/wsgi.py --http :8000
docker exec -it backend_container /bin/bash # to get into running docker
```


### make DB

+ go into makeDB folder
+ run ./runserver, ./makeDB respectively
