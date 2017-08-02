const Joi = require('joi');

module.exports={
  send:{
    url: Joi.string().required()
  }
}
