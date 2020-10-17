var express  = require('express');
var router = express.Router();
var userRoutes = require('../api/user/userRoutes');
var todoRoutes = require('../api/todo/todoRoutes');

router.use('/user', userRoutes);
router.use('/todo', todoRoutes);

module.exports = router;
