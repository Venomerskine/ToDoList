import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { saveData, loadData } from './storage.js';

const projects = []

// Create project
export function createProject(name, description){
    const newProject = new Project(name, description);
    projects.push(newProject);
    saveData('projects', projects);
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
export function createTodoAndAddToProject(projectName, name, description, dueDate, priority, completed, notes) {
    const targetProject = findProjectByName(projectName)

    if (targetProject) {
        const newTodo = new Todo(name, description, dueDate, priority, completed, notes)
        targetProject.addTodo(newTodo)
        console.log(newTodo)
        saveData('projects', projects);
        return newTodo
    } else {
        console.error(`Project "${projectName}" not found`)
        return null
    } 

}

// Delete from project

export function deleteFromProject(projectName, todoId){
    const targetProject = findProjectByName(projectName);

    if(targetProject) {
        const todoIndex = targetProject.todos.findIndex(todo => todo.id === todoId)
        if (todoIndex !== -1){
            const deletedTodo = targetProject.todos.splice(todoIndex, 1)
            console.log("todo deleted")
            return deletedTodo
        } else {
            return null
        }
    } else {
        console.log("Project not found")
        return null
    }
}

export function findTodoById(projectName, todoId) {
    const targetProject = findProjectByName(projectName);
    
    if (targetProject) {
        return targetProject.todos.find(todo => todo.id === todoId);
    }
    return null;
}

export function renderTodoDetailsForEdit(todo) {
    const form = document.getElementById('todo-form');
    if (!form) return;

    document.getElementById('todoName').value = todo.name;
    document.getElementById('todoDescription').value = todo.description;
    document.getElementById('todoDueDate').value = todo.dueDate || ''; 
    
    const prioritySelect = document.getElementById('todoPriority');
    for (let i = 0; i < prioritySelect.options.length; i++) {
        if (prioritySelect.options[i].value.toLowerCase() === todo.priority.toLowerCase()) {
            prioritySelect.selectedIndex = i;
            break;
        }
    }
    
    form.dataset.editingId = todo.id; 
    
    form.querySelector('button[type="submit"]').textContent = 'Update Task';
    form.style.display = 'block';
}