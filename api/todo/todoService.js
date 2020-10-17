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

async function $createToDo(req, res) {
    try {
        if (await db.collection('user').findOne({ _id: ObjectId(req.body.user) })) {
            return await db.collection('todo').insertOne(req.body);
        }
    } catch (error) {
        return await error;
    }
};

async function $getToDo(req) {
    try {
        return await db.collection('todo').find({ user: req.query.user }).toArray();
    } catch (error) {
        return await error;
    }
};

async function $deleteToDo(req) {
    try {
        const data = await db.collection('todo').deleteOne({ _id: ObjectId(req.query.todo) }).toArray();
        console.log(data)
    } catch (error) {
        return await error;
    }
};

async function $updateToDo(req) {
    try {
        await db.collection('todo').updateOne({ _id: ObjectId(req.body._id) }, { $set: { "check": req.body.check } });
        return await db.collection('todo').find({ user: req.body.user }).toArray();
    } catch (error) {
        return await error;
    }
}

module.exports = {
    $createToDo,
    $getToDo,
    $deleteToDo,
    $updateToDo
}