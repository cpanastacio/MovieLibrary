// Requiring module
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const routes = require('./api/routes');

// Creating express object and configure server port
const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use(routes);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zgoi4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));

module.exports = server;
