const Joi = require('joi');
const chalk = require('chalk');


utils={
  strip:(params)=>{
    Object.keys(params).forEach(function(k) {
      if (!params[k] && params[k]!==0) { delete params[k];}
    });
    return params
  },
  permit:(params, permissions)=>{
    return utils.select(params, permissions);
  },
  select:(params, permissions)=>{
    return permissions.reduce(function(o, k) { o[k] = params[k]; return o; }, {});
  },
  validate:(schema)=>{
    return (req,res,next)=>{
      req.params=Object.assign(req.params,req.query, req.body)
      console.log(chalk.cyan("Request Params:"), req.params)
      req.params=utils.permit(req.params, Object.keys(schema))
      req.params=utils.strip(req.params)
      Joi.validate(req.params, schema, (err,value)=>{
        if(err){return res.status(400).json({error:err.details})}
        next()
      })
    }
  }
}

module.exports=utils.validate;
