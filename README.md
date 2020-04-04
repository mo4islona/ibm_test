## Install

```bash
yarn install
```

## Start
```bash
docker-compose up -d
yarn start
```

After first start when web server is ready you should fill the roles table

```bash
docker exec -it $(docker ps -f "name=ibm_test_db" -q) psql -h localhost --user postgres -d postgres -f /home/roles.sql
``` 

Go to [http://localhost:8080/docs](http://localhost:8080/docs)
