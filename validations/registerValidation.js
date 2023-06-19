const Joi = require('@hapi/joi')

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(256).required(),
    email: Joi.string().min(6).max(256).required().email(),
    password: Joi.string().min(6).max(256).required(),
})

module.exports = schemaRegister;