require('module-alias/register');
const router  = require('express').Router(); 
const UserController = require('../controllers/UserController');

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.register);
router.post('/login', UserController.login);
router.put('/:id', UserController.updateRole);
router.put('/password/:id', UserController.updatePassword);
router.delete('/:id', UserController.delete);
 
module.exports = router;