const Information = require('../models/crud');
const { ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");
const { parse } = require('json2csv');
const { request } = require('express');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'virat8anushka1@gmail.com',
        pass: 'virat2020'
    }
});

module.exports.addInformation = (req, res) => {
    const db = req.app.get('db');
    const information = new Information(req.body);
    db.collection('intern1').insertOne(information);
    res.send('Data Added')
}

module.exports.getInformation = async (req, res) => {
    const db = req.app.get('db');
    if(req.query.sortBy === undefined) {
        req.query.sortBy = '_id';
        req.query.sortOrder = 1;
    }
    const cursor = db.collection('intern1').find({}).sort({[req.query.sortBy] : Number(req.query.sortOrder)});
    const data = await cursor.toArray();
    res.json(data)
}

module.exports.getDeleteMany = async (req, res) => {
    const db = req.app.get('db');
    const list = req.body.map((id) => ObjectId(id))
    const cursor = db.collection('intern1').deleteMany({ _id: { $in: list } })
    //const data = await cursor.toArray();
    res.json({ status: 'success' })
}

module.exports.getMailingFacility = async (req, res) => {
    const db = req.app.get('db');
    const list = req.body.map((id) => ObjectId(id))
    const cursor = db.collection('intern1').find({ _id: { $in: list } });
    const data = await cursor.toArray();
    res.json(data);
    const csv = parse(data, ["_id", "name", "email", "phoneNumber", "hobbies"]);

    let info = await transporter.sendMail({
        from: 'virat1anushka8@gmail.com', // sender address
        to: "jay4luhar@gmail.com", // list of receivers
        subject: "Mail Data send", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
        attachments: [
            {
                filename: "file.csv",
                content: csv,
            },
        ]
    });
    

}

module.exports.getUpdateInformation = async (req, res) => {
    const db = req.app.get('db');
    //const information = new Information(req.body);
    const cursor = db.collection('intern1').updateOne(
        { _id: ObjectId(req.body._id) },
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                hobbies: req.body.hobbies,
            }
        }
    )
    // const cursor = db.collection('intern1').updateOne({_id: list})
    // const data = await cursor.toArray();
    res.json({ status: 'success' })
}

