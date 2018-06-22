"use strict";

const router = require("express").Router();
 
const usersRoutes = require("./routes/route");
router.use("/", usersRoutes);

module.exports = router;