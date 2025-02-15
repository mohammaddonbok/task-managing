const taskRepository = require("../repositories/TaskRepository");

class TaskService {
     getPaginationResponse = (data, total, page, limit) => {
        const totalPages = Math.ceil(total / limit);
      
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            totalPages,
          },
        };
      };
  async createTask(data) {
    return await taskRepository.createTask(data);
  }

  async getTaskById(id) {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  async getAllPaginatedTasksCompleted(req, res) {
  
      const pageNumber = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 5;

      const skip = (pageNumber - 1) * pageSize;

      const completedTasks = await taskRepository.getAllPaginatedTasksCompleted(
        skip,
        pageSize
      ); 
      if(completedTasks.length == 0){
        return this.getPaginationResponse(completedTasks,0,pageNumber,pageSize)
      }
      const totalTasks = await taskRepository.TasksNotDeleteAndCompleted();
      return this.getPaginationResponse(completedTasks, totalTasks, pageNumber, pageSize);
  }

  async updateTask(id, data) {
    const model = await taskRepository.getTaskById(id);
    if (!model) {
      throw new Error("Task not found");
    }

    return taskRepository.updateTask(id, data);
  }

  async softDeleteTask(id) {
    const task = await taskRepository.softDeleteTask(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return { message: "Task deleted successfully" };
  }




  async getAllPaginatedTasks(req, res) {
    

      const pageNumber = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 5;

      const skip = (pageNumber - 1) * pageSize;

      const tasks =
        await taskRepository.getAllPaginatedTasksNotDeleteAndNotCompleted(
          skip,
          pageSize
        ); 

        if(tasks.length == 0){
            const response = this.getPaginationResponse(tasks,0,pageNumber,pageSize)
             
             return response;
          }else{
            const totalTasks = await taskRepository.TasksNotDeleteAndNotCompleted();
            const response =  this.getPaginationResponse(tasks, totalTasks, pageNumber, pageSize);
            return response;
                }
  
  }
  
}

module.exports = new TaskService();
