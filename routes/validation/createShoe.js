var Joi = require('joi');

module.exports = {
  body: {
      shoe_name: Joi.string().required()
  }
};
