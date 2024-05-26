require('module-alias/register');
const { PrismaClient } = require('@prisma/client');
const { reservations } = new PrismaClient(); 
const { USER_SERVICE_URI } = require('@root/config');
const { promisify } = require('util');
const { userGrpcClient, roomGrpcClient } = require('@root/main/grpc-client');

// Promisify the gRPC client method
const findUser = promisify(userGrpcClient.find).bind(userGrpcClient);
const findRoom = promisify(roomGrpcClient.find).bind(roomGrpcClient);

module.exports = {
    index: async (req, res, next) => {
        try {
            const reservations_ = await reservations.findMany();
    
            const result = await Promise.all(reservations_.map(async (reservation) => {
                try {
                    const user = await findUser({ id: reservation.userId });
                    const room = await findRoom({ id: reservation.roomId });
                    
                    return { ...reservation, user, room };
                } catch (err) {
                    throw new Error(err);
                }
            }));
    
            return res.json(result);
        } catch (error) {
            next(error);
        }
    },

    store: async(req, res, next) => {
        try {
            req.body.date_heure_debut = new Date(req.body.date_heure_debut)
            req.body.date_heure_fin = new Date(req.body.date_heure_fin)

            const new_res = await reservations.create({
                data: req.body
            }); 
            return res.json(new_res);
            
        } catch (error) {
            next(error); 
        }
    }, 

    update: async(req, res, next) => {
        try {
            const { id } = req.params; 
            req.body.date_heure_debut = new Date(req.body.date_heure_debut)
            req.body.date_heure_fin = new Date(req.body.date_heure_fin)

            const update_res = await reservations.update({
                where: {id: +id}, 
                data: req.body
            }); 
            return res.json(update_res);
           
        } catch (error) {
            next(error); 
        } 
    }, 

    delete: async(req, res, next) => {
        try {
            const { id } = req.params; 

            const delete_res = await reservations.delete({
                where: {id: +id}
            }); 
            
            return res.json(delete_res);
           
        } catch (error) {
            next(error)
        }
    },

    show: async(req, res, next) => {
        try {
            const { id } = req.params; 

            const reservation = await reservations.findFirst({
                where: {id: +id}
            }); 
            
            const user = await findUser({ id: reservation.user_id });
            const room = await findRoom({ id: reservation.room_id });

            return res.json({...reservation, user, room});
         
        } catch (error) {
            next(error); 
        }
    }
}