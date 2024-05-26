require('module-alias/register');
const { PrismaClient } = require('@prisma/client');
const { reservations } = new PrismaClient(); 

module.exports = {
    index: async(req, res, next) => {
        try {
            const reservations_ = await reservations.findMany(); 
            return res.json(reservations_);
            
        } catch (error) {
            next(error); 
        }
    }, 

    store: async(req, res, next) => {
        try {
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

            const res = await reservations.findFirst({
                where: {id: +id}
            }); 
            
            return res.json(res);
         
        } catch (error) {
            next(error); 
        }
    }
}