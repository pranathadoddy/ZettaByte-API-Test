const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json())

const database = require("./src/db/database.js");

database.connect();

const articleRoute = require("./src/routes/article.route");
const commentRoute = require("./src/routes/comment.route");

articleRoute(app);
commentRoute(app);


app.listen("5002", ()=>{
    console.log("Backend is running");
})