let thoughtRoutes = require("./thought-routes");
let route = require("express").Router();
let usersRoutes = require("./user-routes");

route.use("/users", usersRoutes);
route.use("/thoughts", thoughtRoutes);


module.exports = route;