const SERVICE_HOST = '0.0.0.0'
const USER_SERVICE_URI = `${SERVICE_HOST}:50051`
const RESERVATION_SERVICE_URI = `${SERVICE_HOST}:50052`
const ROOM_SERVICE_URI = `${SERVICE_HOST}:50053`

const REST_API_HOST = 'localhost'
const REST_API = `http://${REST_API_HOST}:8080`
const REST_API_USER = `http://${REST_API_HOST}:8081`
const REST_API_ROOM = `http://${REST_API_HOST}:8082`
const REST_API_RESERVATION = `http://${REST_API_HOST}:8083`

module.exports = {
    USER_SERVICE_URI, 
    RESERVATION_SERVICE_URI, 
    ROOM_SERVICE_URI, 
    REST_API,
    REST_API_USER, 
    REST_API_ROOM, 
    REST_API_RESERVATION
}