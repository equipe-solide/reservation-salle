require('module-alias/register');
const router  = require('express').Router(); 
const EquipementController = require('../controllers/EquipementController');

router.get('/', EquipementController.index);
router.get('/:id', EquipementController.show);
router.post('/', EquipementController.store);
router.put('/:id', EquipementController.update);
router.delete('/:id', EquipementController.delete);

module.exports = router;