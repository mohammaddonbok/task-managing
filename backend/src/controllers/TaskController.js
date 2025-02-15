const taskService = require("../services/TaskServices");

class TaskController {
  
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAllPaginatedTasks(req, res) {
    try{

        const tasks = await taskService.getAllPaginatedTasks(req,res);
        res.status(200).json(tasks);
        return;
    }catch (error) {
        res.status(400).json({ message: error.message });
      }
      }

  async getAllPaginatedTasksCompleted(req,res){
    try{
        const completedTasks = await taskService.getAllPaginatedTasksCompleted(req,res);
        res.status(200).json(completedTasks);
        return;
    }
    catch (error) {
        res.status(400).json({ message: error.message });
      }
 }

  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      res.status(200).json(task);
      return;
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async softDeleteTask(req, res) {
    try {
      const response = await taskService.softDeleteTask(req.params.id);
      res.status(201).json(response);
      return;
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  async getTaskById(req, res){
    try{
    const task = await taskService.getTaskById(req.params.id)
    res.status(200).json(task);
    return;
    }
    catch (error) {
        res.status(404).json({ message: "Task not found" });
      }
  }
}

module.exports = new TaskController();
