const router = require('express').Router();

const validate=require("../validations/index");
const validator=require("../validations/validator");



router.post("/send", validate(validator.send), controller.send);
