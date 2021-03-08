const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Plese provide a username"]
    }, 
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                "Please provide a email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        select: false,
        minLength: 6
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPasswords = async function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

module.exports = User = mongoose.model('User', userSchema);