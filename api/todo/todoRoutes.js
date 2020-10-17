var express = require('express');
var router = express.Router();
var todoController = require('./todoController');

router.post('/createToDo', todoController.createToDo);
router.get('/getToDo', todoController.getToDo);
router.delete('/deleteToDo', todoController.deleteToDo);
router.put('/updateToDo', todoController.updateToDo);

module.exports = router;