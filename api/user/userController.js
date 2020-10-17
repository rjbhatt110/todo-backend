const userService = require('./userService');

userAuthenticate = function (req, res) {
    userService.$userAuthenticate(req).then((data) =>
        data ? res.status(200)
            .json({
                status: 'success',
                data: data,
                messsage: 'User Logged In'
            }) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
};

userRegister = function (req, res) {
    userService.$userRegister(req).then((data) =>
        data ? res.status(200)
            .json({
                status: 'success',
                data: data,
                messsage: 'User Registerd'
            }) : res.status(400).json({ message: 'Email Already Registerd' }))
        .catch(err => res.send(err));
};

userCurrent = function (req, res) {
    userService.$userCurrent(req).then((data) =>
        res.status(200)
            .json({
                status: 'success',
                data: data,
                messsage: 'Retrived All data'
            }))
        .catch(err => res.send(err));
};

userDelete = function (req, res) {
    userService.$userDelete().then((data) => res.status(200)
        .json({
            status: 'success',
            data: data,
            messsage: 'User Deleted Successfully'
        }))
        .catch(err => res.send(err));
};

module.exports = {
    userAuthenticate,
    userRegister,
    userCurrent,
    userDelete
}