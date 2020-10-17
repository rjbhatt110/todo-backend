const todoService = require('./todoService');

createToDo = function (req, res) {
    todoService.$createToDo(req).then((data) =>
        res.status(200)
            .json({
                status: 'success',
                data: data.ops,
                message: 'Todo Created'
            }))
        .catch(err => res.send(err));
};

getToDo = function (req, res) {
    todoService.$getToDo(req).then((data) =>
        res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Retrived All data'
            }))
        .catch(err => res.send(err));
};

deleteToDo = function (req, res) {
    todoService.$deleteToDo(req).then((data) => res.status(200)
        .json({
            status: 'success',
            message: 'Todo Deleted Successfully'
        }))
        .catch(err => res.send(err));
};

updateToDo = function (req, res) {
    todoService.$updateToDo(req).then((data) => res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Todo Updated Successfully'
        }))
        .catch(err => res.send(err));
};


module.exports = {
    createToDo,
    getToDo,
    deleteToDo,
    updateToDo
}