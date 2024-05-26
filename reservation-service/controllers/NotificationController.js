require('module-alias/register');
const { PrismaClient } = require('@prisma/client');
const { reservations, notifications } = new PrismaClient(); 

module.exports = {
    index: async(req, res, next) => {
        try {
            const notifications_ = await notifications.findMany(); 
            return res.json(notifications_);
            
        } catch (error) {
            next(error); 
        }
    }, 

    store: async(req, res, next) => {
        try {
            const new_res = await notifications.create({
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

            const update_res = await notifications.update({
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

            const delete_res = await notifications.delete({
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

            const res = await notifications.findFirst({
                where: {id: +id}
            }); 
            
            return res.json(res);
         
        } catch (error) {
            next(error); 
        }
    }
}