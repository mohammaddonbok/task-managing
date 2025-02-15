const express = require("express");
const router = express.Router();
const taskRoutes = require("./TaskRouters");

router.use(taskRoutes);

module.exports = router;