const Joi = require('joi');

const pronosticSchema = Joi.object({

  score: Joi.object({

    fullTime: Joi.object({
      home: Joi.number().integer().min(0).required(),
      away: Joi.number().integer().min(0).required(),
    }).and('home', 'away').required(),

    halfTime: Joi.object({
      home: Joi.number().integer().min(0).required(),
      away: Joi.number().integer().min(0).required(),
    }).and('home', 'away')

  }).required(),

  goals: Joi.object({
    minute_first: Joi.number().integer().min(0).max(130).required()
  })

}).required();

module.exports = { pronosticSchema };
