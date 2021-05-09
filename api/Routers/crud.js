const { celebrate, Segments, Joi } = require('celebrate')
const express = require('express')
const router = express.Router();
const { addInformation, getInformation, getDeleteMany, getUpdateInformation, getMailingFacility  } = require('../controllers/crud')

router.post('/insert', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z ]*$/).required(),
        phoneNumber: Joi.string().regex(/^[0-9]+$/).min(10).max(10).required(),
        email: Joi.string().email().required(),
        hobbies: Joi.string().required(),
    })
}), addInformation);

router.get('/show', celebrate({
    [Segments.BODY]:{
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        hobbies: Joi.string().required(),
    }
}), getInformation);

router.post('/delete', getDeleteMany);

router.post('/update', celebrate({
    [Segments.BODY]:{
        _id:Joi.string().required(),
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        hobbies: Joi.string().required(),
    }
}), getUpdateInformation);

router.post('/mail', getMailingFacility)
module.exports = router;