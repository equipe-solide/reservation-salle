### INSTALL PACKAGE 


### LAUNCH APP 

- Run Gateway [Optional]
    ```bash
        cd gateway
        npm run start
    ```

- Run Main Service
    ```bash
        cd main
        npm run start-dev # dev
        npm run start # prod
    ```

- Without the API Gateway:
    * room-service run @`localhost:8081`
    * user-service run @`localhost:8082`
    * reservation-service run @`localhost:8083`

- With the API Gateway:
    * server run @`localhost:8080`

