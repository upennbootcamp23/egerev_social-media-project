let thoughtRoutes = require("./thoughts-routes");
let route = require("express").Router();
let usersRoutes = require("./users-routes");

route.use("/users", usersRoutes);
route.use("/thoughts", thoughtRoutes);


module.exports = route;