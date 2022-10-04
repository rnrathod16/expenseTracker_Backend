const express = require("express");
const route = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// route.post("/new", async(req, res) => {
//     const { name } = req.body;
//     console.log(name);
//     const inserted = new User({ name });
//     const result = await inserted.save();

//     if (result) {


//         res.status(200).json("User Inserted");
//     }
// })

route.post("/update", async(req, res) => {
    const { transc, token } = req.body;

    const user = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(user);
    const data = await User.findByIdAndUpdate({ _id: user._id }, { $push: { transactions: transc } });

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json("not inserted trans");
    }

})

route.get("/request", async(req, res) => {

    // const _id = "632e82a7e5d9d04cb0c450b2";
    const token = req.headers['authorization'];
    if (token === null) {
        return console.log("Token not found");
    }

    try {
        const user = await jwt.verify(token, process.env.SECRET_KEY);

        const data = await User.findById({ _id: user._id });

        // console.log(data);
        if (data) {
            return res.status(200).json({ do: data.transactions });
        }
    } catch (error) {
        console.log(error);
    }
})

route.post("/delete", async(req, res) => {
    // const _id = "632e82a7e5d9d04cb0c450b2"
    const { idx, token } = req.body;
    const user = await jwt.verify(token, process.env.SECRET_KEY);
    const data = await User.updateOne({
        _id: user._id
    }, {
        $pull: {
            transactions: {
                _id: idx.id
            }
        }
    });

    if (data) {
        return res.status(200).json(data);
    }
})

module.exports = route;