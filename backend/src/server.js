//Requiring module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Creating express object and configure server port
const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());
server.use(require("./api/routes.js"));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zgoi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

module.exports = server;
