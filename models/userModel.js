const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transactions: [{
        title: {
            type: String
        },
        type: {
            type: String
        },
        amount: {
            type: Number
        }
    }]
})

userSchema.pre("save", async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        console.log(error);
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;