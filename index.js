const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors')
const authRoute = require("./routes/authRoute");
const transactionRoute = require("./routes/transactionRoute");

dotenv.config({ path: "./config.env" });
require("./db/connection");

const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cors());
app.use("/", authRoute);
app.use("/transaction", transactionRoute);

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log("Server Started");
})