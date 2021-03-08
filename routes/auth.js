const express = require('express');
const router = express.Router();

//Bring in our controller file which holds the functions we'll pass in as our post arguments;

const { register, login, forgotpassword, resetpassword } = require('../controllers/auth');

router.route("/register").post(register);

router.post("/login", login);

router.route('/forgotpassword').post(forgotpassword);

router.route('/resetpassword/:resetToken').put(resetpassword);

module.exports = router;