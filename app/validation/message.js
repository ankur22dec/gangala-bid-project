const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: data =>
        Joi.object({
            conversationId: Joi.objectId().required(),
            date: Joi.date(),
            authorId: Joi.objectId().required(),
            body: Joi.string().required()
        }).validate(data),

    messageId: data =>
        Joi.object({
            messageId: Joi.objectId().required()
        }).validate(data)
}
