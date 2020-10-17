var express = require('express');
var router = express.Router();
var userController = require('./userController');

router.post('/authenticate', userController.userAuthenticate);
router.post('/register', userController.userRegister);
router.get('/current', userController.userCurrent);
router.delete('/userDelete', userController.userDelete);

module.exports = router;