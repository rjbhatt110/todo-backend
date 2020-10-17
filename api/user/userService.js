var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const config = require('../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let db;

MongoClient.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    db = client.db('user');
}).catch(error => console.error(error));

process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});

async function $userAuthenticate(req, res) {
    try {
        const user = await db.collection('user').findOne({ email: req.body.email })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
            return {
                ...user,
                token
            };
        }
    } catch (error) {
        return await error;
    }
};

async function $userRegister(req, res) {
    try {
        if (await db.collection('user').findOne({ email: req.body.email })) {
            return
        }
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const user = await db.collection('user').insertOne(req.body);
        if (user.ops[0]) {
            const token = jwt.sign({ sub: user.ops[0]._id }, config.secret, { expiresIn: '7d' });
            return {
                ...user.ops[0],
                token
            };
        }
    } catch (error) {
        return await error;
    }
};

async function $userCurrent(req) {
    try {
        const decoded = jwt.verify(req.headers.authorization.replace('Bearer', '').trim(), config.secret)
        return await db.collection('user').find({ _id: ObjectId(decoded.sub) }).toArray();
    } catch (error) {
        return await error;
    }
};

async function $userGetById(req) {
    try {
        return await db.collection('user').find({ _id: ObjectId(req) }).toArray();
    } catch (error) {
        return await error;
    }
};

async function $userDelete(req, res) {
    try {
        return await db.collection('imagestore').find({ "_id": ObjectId(req.query.id) }).next();
    } catch (error) {
        return await error;
    }
};

module.exports = {
    $userAuthenticate,
    $userRegister,
    $userCurrent,
    $userDelete,
    $userGetById
}