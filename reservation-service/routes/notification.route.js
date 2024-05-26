require('module-alias/register');
const router  = require('express').Router(); 
const NotificationController = require('../controllers/NotificationController');

router.get('/', NotificationController.index);
router.get('/:id', NotificationController.show);
router.post('/', NotificationController.store);
router.put('/:id', NotificationController.update);
router.delete('/:id', NotificationController.delete);
 
module.exports = router;