//Requiring module
const express = require("express");
const cors = require("cors");

//Creating express object
const server = express();
server.use(express.json());
server.use(cors());

server.use(require("./api/routes"));

const PORT = 8000;

//Server setup
server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;
