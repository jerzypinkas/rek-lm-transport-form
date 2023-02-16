# Rek LM Air Cargo Transport

## Download
```
git clone git@github.com:jerzypinkas/rek-lm-transport-form.git
```

## Pre-install
In terminal run 
```
echo `id -u`:`id -g`
```
and  copy this value to `.env` file in main directory.

## Build docker images
```
cd rek-lm-transport-form
docker-compose build
docker-compose up
```

## Instalation
You only need to install `Pimcore`. Frontend application is building by docker.

```
# install packages
docker-compose exec php composer install

# !!! NOTE !!! Docker images were build on Windows WSL (Ubuntu). You may need to fix permissions
chmod 0777 var

# or even make directories
mkdir var/admin
mkdir var/versions
# .etc

# install pimcore 
# (You can change admin credetianls)
# Database need to be same as in .env file

docker-compose exec php ./vendor/bin/pimcore-install --admin-username=admin --admin-password=admin --mysql-username=pimcore --mysql-password=pimcore --mysql-database=pimcore --mysql-host-socket=db
```

## Post-install
```
# build pimcore dataobject classes
bin/console pimcore:build:classes
```

There is no datafixtures provider, but we need list of airplanes
Make them sending this request e.g. via Postman
Remember to change email addresses!
```
curl --location 'http://localhost/api/airplanes' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "data": [
        {
            "name": "Airbus A380",
            "payload": 35000,
            "email": "airbus@example.com"
        },
        {
            "name": "Boeing 747",
            "payload": 38000,
            "email": " boeing@example.com"
        }
    ]
}'
```
Go to http://localhost and login with credentials (sent before at installation)
Go to System -> System Settings then expand "Debug" and fill Yours valid email address (sender)


### Main application
http://localhost

### Admin application
http://localhost/admin