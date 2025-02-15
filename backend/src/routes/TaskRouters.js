const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
router.post("/task/createTask", TaskController.createTask);
router.get("/tasks", TaskController.getAllPaginatedTasks);
router.get("/tasks/completed",TaskController.getAllPaginatedTasksCompleted)
router.get("/task/:id",TaskController.getTaskById)
router.put("/task/:id", TaskController.updateTask);
router.delete("/task/:id", TaskController.softDeleteTask);

module.exports = router;
