const authRouter = require("./auth");
const productsRouter = require("./products");
const permissionsRouter = require("./permissions");


const routeConfig = [
  {
    path: "/api/v1/auth",
    route: authRouter
  },
  {
    path: "/api/v1/products",
    route: productsRouter
  },
  {
    path: "/api/v1/permissions",
    route: permissionsRouter
  }
];
module.exports = routeConfig;
