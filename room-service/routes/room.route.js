require('module-alias/register');
const router  = require('express').Router(); 
const RoomController = require('../controllers/RoomController');

router.get('/', RoomController.index);
router.get('/:id', RoomController.show);
router.post('/', RoomController.store);
router.put('/:id', RoomController.update);
router.delete('/:id', RoomController.delete);
 
module.exports = router;