var Joi = require('joi');

module.exports = {
  body: {
      rank: Joi.number().integer().min(1).max(5).required()
  }
};
