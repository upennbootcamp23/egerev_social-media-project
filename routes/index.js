let router = require('express').Router();

let apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>ERROR! TRY AGAIN!</h1>');
  });
  
  module.exports = router;