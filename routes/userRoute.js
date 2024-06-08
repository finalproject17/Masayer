const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/post', userController.register);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);
router.patch('/changeactivity/:id', userController.changeUserActivity);
router.post('/login', userController.login);

module.exports = router;
