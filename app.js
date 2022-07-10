const express = require('express');
const logger = require('morgan');
const cors=require('cors');

const {
    unknownEndpoint,
    errorHandler,
  } = require("./utils/middleware");
  const routeConfig = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

routeConfig.map((item) => app.use(item.path, item.route));

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;