cd ..
mkdir temp
mv work temp
mv tag temp
mv artist temp
mv makeDB/backend/connectoon/work .
mv makeDB/backend/connectoon/tag .
mv makeDB/backend/connectoon/artist .
rm -f db.sqlite3
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
