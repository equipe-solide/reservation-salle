require('module-alias/register');
const router  = require('express').Router(); 
const ReservationController = require('@root/reservation-service/controllers/ReservationController');

router.get('/', ReservationController.index);
router.get('/:id', ReservationController.show);
router.post('/', ReservationController.store);
router.put('/:id', ReservationController.update);
router.delete('/:id', ReservationController.delete);
 
module.exports = router;