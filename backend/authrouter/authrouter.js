const express=require('express');
const { home } = require('../controller/home');
const { signUp } = require('../controller/signup');
const { login } = require('../controller/login');
// const { verifyToken } = require('../middleware/verifyToken');
const { bookClass } = require('../controller/bookClass');
const { cancelBooking } = require('../controller/cancleBooking');
const { getClasses } = require('../controller/getClasses');

/*--------------------------------------------------------------*/
/*-----------------------Router for API-------------------------*/
/*--------------------------------------------------------------*/


const router=express.Router();

router.route("/").get(home);
router.route("/signup").post(signUp);
router.route("/login").get(login);
router.route("/bookclass").post(bookClass);
router.route("/cancelBooking").post(cancelBooking);
router.route("/getclasses").get(getClasses);

module.exports={router};