const express = require("express");
const rootcontroller = require("../controller/rootcontroller");
const router = express.Router();

router.get("/", rootcontroller);
module.exports = router;