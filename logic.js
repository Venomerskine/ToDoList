import { Project } from "./project.js";
import { Todo } from "./todo.js";

const projects = []

// Create project
export function createProject(name, description){
    const newProject = new Project(name, description);
    projects.push(newProject);
    return newProject;
}

//List projects
export function listProjects() {
    return projects;
}
// Find project by name
export function findProjectByName (name) {
    return projects.find(project => project.name === name)
}

//Create todo & Add todo to project
export function createTodoAnsAddToProject(projectName, name, description, dueDate, priority, completed, notes) {
    const targetProject = findProjectByName(projectName)

    if (targetProject) {
        const newTodo = new Todo(name, description, dueDate, priority, completed, notes)
        targetProject.addTodo(newTodo)
        return newTodo
    } else {
        console.error(`Project "${projectName}" not found`)
        return null
    } 

}

