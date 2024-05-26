### INSTALL PACKAGE [NO DOCKER]
```bash
    # gateway
    cd gateway & npm install

    # main
    cd main & npm install

    # room-service  
    cd room-service & npm install

    # user-service
    cd user-service & npm install

    # reservation-service
    cd reservation-service & npm install
```
### RUN MIGRATIONS [NO DOCKER]
```bash
    # gateway
    cd gateway & npm run migrate

    # main
    cd main & npm run migrate

    # room-service  
    cd room-service & npm run migrate

    # user-service
    cd user-service & npm run migrate

    # reservation-service
    cd reservation-service & npm run migrate
```

### LAUNCH APP [NO DOCKER]

- Run Gateway [Optional]
    ```bash
        cd gateway & npm run start
    ```

- Run Main Service
    ```bash
        cd main
        npm run start-dev # dev
        npm run start # prod
    ```

- Without the API Gateway:
    * user-service run @`localhost:8081`
    * room-service run @`localhost:8082`
    * reservation-service run @`localhost:8083`

- With the API Gateway:
    * server run @`localhost:8080`

