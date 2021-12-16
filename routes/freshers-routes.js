const express = require("express");
const router = express.Router();

const freshersContoller = require("../controllers/freshers-controller");

router.get("/", freshersContoller.getFreshers);

router.get("/:uid", freshersContoller.getFreshersById); // 2

router.post("/addFresher", freshersContoller.addFresher);

router.post("/login", freshersContoller.login); //1

module.exports = router;
