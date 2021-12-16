./addDB/addDB_artist.sh
./addDB/addDB_tag.sh
./addDB/addDB_work.sh
cd ..
mv work makeDB/backend/connectoon
mv tag makeDB/backend/connectoon
mv artist makeDB/backend/connectoon
mv temp/work .
mv temp/tag .
mv temp/artist .
rm -rf temp
python3 manage.py makemigrations
python3 manage.py migrate
