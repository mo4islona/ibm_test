## Install

```yarn install```

## Start
```
docker-compose up -d
yarn start
```

After first start when web server is ready you should fill the roles table

```docker exec -it $(docker ps -f "name=^ibm_test" -q) psql -h localhost --user postgres -d postgres -f /home/roles.sql``` 

Go to [localhost:8080/docs](localhost:8080/docs)




