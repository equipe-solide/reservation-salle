require('module-alias/register');
const { PrismaClient } = require('@prisma/client');
const { rooms, equipements } = new PrismaClient(); 

module.exports = {
    index: async(req, res, next) => {
        try {
            const equipements_ = await equipements.findMany(); 
            return res.json(equipements_);
            
        } catch (error) {
            next(error); 
        }
    }, 

    store: async(req, res, next) => {
        try {
            const new_room = await equipements.create({
                data: req.body
            }); 
            return res.json(new_room);
            
        } catch (error) {
            next(error); 
        }
    }, 

    update: async(req, res, next) => {
        try {
            const { id } = req.params; 

            const update_room = await equipements.update({
                where: {id: +id}, 
                data: req.body
            }); 
            return res.json(update_room);
           
        } catch (error) {
            next(error); 
        } 
    }, 

    delete: async(req, res, next) => {
        try {
            const { id } = req.params; 

            const delete_room = await equipements.delete({
                where: {id: +id}
            }); 
            
            return res.json(delete_room);
           
        } catch (error) {
            next(error)
        }
    },

    show: async(req, res, next) => {
        try {
            const { id } = req.params; 

            const room = await equipements.findFirst({
                where: {id: +id}
            }); 
            
            return res.json(room);
         
        } catch (error) {
            next(error); 
        }
    }
}