const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: data =>
        Joi.object({
            joined: Joi.date(),
            members: Joi.array().items(Joi.objectId().required()).min(2).max(2).required()
        }).validate(data),

    conversationId: data =>
        Joi.object({
            conversationId: Joi.objectId().required()
        }).validate(data)
}
