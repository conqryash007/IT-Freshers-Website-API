const express = require("express");
const router = express.Router();
const authuser = require("./../middleware/auth-user");
const tasksController = require("../controllers/tasks-controller");

router.post("/addtask", tasksController.createTask);

router.get("/gettask/:tid", tasksController.getTaskById); //3

router.post("/addsubject/:tid", tasksController.addSubject);
router.use(authuser);

router.post("/check/:uid/:tid/:qid", tasksController.checkAns); //4

module.exports = router;
