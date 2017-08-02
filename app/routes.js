const router = require('express').Router();

const validate=require("./validations/index");
const validator=require("./validations/validator");
const controller=require("./controllers/webpages")


router.post("/send", validate(validator.send), controller.send);


module.exports=router
