const errorResponse = require('../utils/errorResponse');
const User = require("../models/User");
const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

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
            return next(new errorResponse("Email does not exist", 404))
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) { 
            return new errorResponse("Password is incorrect", 404)
        }

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }

}

exports.forgotpassword = async (req, res, next) => {
    
    const {email} = req.body;

    try {
        
        const user = await User.findOne({email});

        if(!user) {
            return next(new errorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please click on the link to reset your password</p>
        <a href=${resetUrl} clickTracking=off>${resetUrl}</a>
        `
        try {

            await sendEmail({
                to: user.email,
                subject: 'Reset Password Request',
                text: message
            })

            res.status(200).json({succes: true, data: 'Email sent'});
            
        } catch (error) {
            
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent, because of error", 500));
        }

    } catch (error) {
        next(error);
    }

}

exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex"); 

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })

    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token})
}