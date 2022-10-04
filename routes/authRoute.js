const express = require("express");
const User = require("../models/userModel");
const route = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

route.post("/signup", async(req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(401).send("Enter all the fields");
        }

        const result = await User.findOne({ username });

        if (result) {
            return res.status(401).send("User Already Exists");
        }

        const newUser = new User({ username, password });
        const update = await newUser.save();

        if (update) {
            return res.status(200).send("User Inserted");
        } else {
            return res.status(401).send("User Not Inserted");

        }

    } catch (error) {
        console.log(error);
    }
})

route.post("/login", async(req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(401).json({ message: "Enter all the fields" });
        }

        const result = await User.findOne({ username });

        if (result) {
            const verifyPass = await bcrypt.compare(password, result.password);

            if (verifyPass) {
                const token = jwt.sign({ _id: result._id }, process.env.SECRET_KEY);
                return res.status(200).json({ message: "User Signed in", token: token, dat: result._id, usename: result.username });
            } else {
                return res.status(401).json({ message: "Invalid Credentials" });

            }
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
    }
})
module.exports = route;