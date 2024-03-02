const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const http = require("http");
const mongoose =  require("mongoose");
const router = require("./src/routes/index");
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", router);

const port = process.env.PORT || 4000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("-----> Mongodb connected <-----");
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
    });
}).catch((err) => {
    console.log({err});
    process.exit(1);
});