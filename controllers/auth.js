const errorResponse = require('../utils/errorResponse');
const User = require("../models/User");

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {

        const user = await User.create({
            username,
            email,
            password
        })

        sendToken(user, 201, res);

    } catch(error) {
        next(error);
    }

}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if( !email || !password) {
        //status code 400 is invalid user credential
        return new errorResponse("Please provide email and password", 400)
    }

    try {

        const user = await User.findOne({ email }).select("+password");

        if(!user) {
            return new errorResponse("Invalid credentials", 404)
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) { 
            return new errorResponse("Invalid credentials", 404)
        }

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }

}

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot password route");
}

exports.resetpassword = (req, res, next) => {
    res.send("Reset password route");
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token})
}