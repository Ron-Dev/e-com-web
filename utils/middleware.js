const passport = require('passport');
require('./passport')(passport);
const Helper = require('../utils/helper');
const helper = new Helper();

const unknownEndpoint = (_, response) => {
  response.status(404).send({ status: 404, message: "unknown endpoint" });
};

const errorHandler = (error, _, response) => {
  response.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
};

const checkAuthorization = (action) => {
  return async (req, res, next) => {
    try {
      await helper.checkPermission(req.user.role_id, action);
      next();
    } catch (error) {
      res.status(401).send("Not authorized to access endpoint");
    }
  };
};

const checkAuthentication = () => {
  return passport.authenticate('jwt', {
      session: false
  })
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  checkAuthorization,
  checkAuthentication
};
