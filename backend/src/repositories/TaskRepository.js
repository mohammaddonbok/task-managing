const Task = require("../models/Task");
const mongoose = require("mongoose");

class TaskRepository {
  async createTask(data) {
    return await Task.create(data);
  }

  async getTaskById(id) {
    return await Task.findOne({ _id: id, deletedAt: null });
  }

  async updateTask(id, data) {
    const taskId = mongoose.Types.ObjectId.createFromHexString(id);
    return Task.findByIdAndUpdate(taskId, data, { new: true });
  }

  async getAllPaginatedTasksCompleted(skip,pageSize){
    return await Task.find({ completed: true, deletedAt: null }).skip(skip) 
    .limit(pageSize) 
    .sort({ createdAt: -1 }); 
  }

  async softDeleteTask(id) {
    return await Task.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
  }

  async getAllPaginatedTasksNotDeleteAndNotCompleted(skip,pageSize) {
    return await Task.find({deletedAt:null, completed: false})
            .skip(skip) 
            .limit(pageSize) 
            .sort({ createdAt: -1 }); 
  }

  async TasksNotDeleteAndNotCompleted(){
    return await Task.countDocuments({deletedAt:null, completed: false})
}

async TasksNotDeleteAndCompleted(){
    return await Task.countDocuments({deletedAt:null, completed: true})
}
}



module.exports = new TaskRepository();