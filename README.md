# SWPP team 10
[![Build Status](https://travis-ci.com/swsnu/swpp2021-team10.svg?branch=master)](https://travis-ci.com/github/swsnu/swpp2021-team10)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team10&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team10)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team10/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2021-team10?branch=master)

# How to run  
## Frontend  
* `cd frontend/connectoon`  
* `yarn install`  
* `yarn start`  

## Backend  
* `cd backend/connectoon`  
* `pip install -r requirements.txt`  
* `python manage.py makemigrations`  
* `python manage.py migrate`  
* `python manage.py runserver`  


# How to test  
## Frontend  
### Unit Test
* `cd frontend/connectoon`  
* `yarn test --coverage --watchAll=false`  

## Backend  
### Unit Test  
* `cd backend/connectoon`  
* `coverage run --branch --source="." manage.py test`  
* `coverage report`    
