# Task-Manager


## Introduction

The Task Manager is a user-friendly web application designed to simplify task management. It empowers users to efficiently create, edit, delete, and mark tasks as completed. With an intuitive and clean user interface, the platform provides seamless control over tasks and offers a comprehensive table view to track completed tasks. Whether for personal or professional use, the Task Manager ensures an organized and productive workflow.

## Technology used

- Node.js Express as backend
- Next.js as frontend
- Mongodb for the data base
   
## Installation
1. Clone repository
   - Copy this link to your directory
   - (https://github.com/mohammaddonbok/task-managing.git)
   - if using bash (git@github.com:mohammaddonbok/task-managing.git)
     
2. [Download node.js](https://nodejs.org/en/download)

3. [Download MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)

4. Start MongoDB
   - open bash terminal and run
    
    ```
    brew services start mongodb/brew/mongodb-community
    ```
5. Connect to MongoDB
   
   - type in terminal
     
     ```
     mongo
     ```

7. Open Terminal and navigate to the project directory
    - create .env file inside backend/
      - inside .env type
       
     ```
      DATA_BASE_URI=mongodb://localhost:27017/taskdb
      PORT=3001
      ```
     - create .env file inside task-manager
       - inside .env type
        
        ```
        NEXT_PUBLIC_API_URL=http://localhost:3001/api
        ```
        
   - go to task-manager file following these steps
     - example: cd /path/to/your/project
       - navigate to task-manager
         - cd ~/Documents/projects/task-manager
         ```
         npm install
         ```
         - to start the frontend type
           ```
           npm run dev
           ```
      - navigate to backend  
         - cd ~/Documents/projects/backend
         ```
         npm install
         ```
        
         - to start the backend server on your local type
          ```
          npm run dev
          ```
    ## Decisions made during development.

     1. Using CSS framework like Material UI and tailwind
     2. Use Next.js in frontend development since it is simple to use
     3. Create Reusable Components like AddEditComponent to handle both features in one component and reduce the code redundancy  
     4. Using alerts like Toaster MUI component to alert the user with sucess and failure requests
     5. Follow the MVC structure in the backend to understand the code easily controller,service,model and repository files
     
    
