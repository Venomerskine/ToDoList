import { 
  renderProjects,
  renderTodos,
  bindOpenProjectForm, 
  bindAppProject, 
  bindOpenTodoForm, 
  bindAddTodo,
  bindProjectClick ,
  bindTodoClick,
  renderTodoDetailsForEdit,
  bindDeleteTodo
} from './dom.js';

import { 
  createProject, 
  listProjects, 
  createTodoAndAddToProject ,
  findProjectByName,
  findTodoById,
  deleteFromProject
} from './logic.js';

import { saveData, loadData } from './storage.js';

function persistData() {
  saveData('projects', listProjects());
}


const projects = loadData('projects') || [];
renderProjects(projects);

let activeProject = null; 

function initializeApp() {
  const projects = listProjects()
  if(projects.length === 0){
    activeProject = createProject('Inbox', 'Default tasks')
  } else{
    activeProject = projects[0]
  }

  renderProjects(listProjects());
  if(activeProject){
    renderTodos(activeProject)
  }

    bindOpenProjectForm(); 
    bindAppProject(handleProjectCreation);

    bindProjectClick(handleProjectSelection); 

    bindAddTodo(handleTodoUpdateOrCreation)

    if (activeProject) {
        bindOpenTodoForm();
    }
}

function handleProjectCreation(name, description) {
  createProject(name, description);
  renderProjects(listProjects());
  persistData();
  bindOpenProjectForm(); 
  bindProjectClick(handleProjectSelection); 
}


function handleProjectSelection(projectName) {
    activeProject = findProjectByName(projectName);
    if (activeProject) {
        renderTodos(activeProject);
        bindOpenTodoForm(); 
        bindTodoClick(handleTodoClick); 
        bindDeleteTodo(handleTodoDeletion)
    }
}

function handleTodoUpdateOrCreation(name, description, dueDate, priority) {
  const form = document.getElementById('todo-form');
  const editingId = form.dataset.editingId;
  
  if (editingId) {
    handleTodoUpdate(name, description, dueDate, priority);
  } else {
    if (!activeProject) {
      console.error("Cannot add todo: No project is currently active.");
      return;
    }

    createTodoAndAddToProject(activeProject.name, name, description, dueDate, priority);
    persistData(); 

    form.reset();
    form.style.display = 'none';

    handleProjectSelection(activeProject.name); 
  }
}


function handleTodoClick(projectName, todoId) {
    const todo = findTodoById(projectName, todoId);
    
    if (todo) {
        renderTodoDetailsForEdit(todo);
    }
}

function handleTodoUpdate(name, description, dueDate, priority) {
    const form = document.getElementById('todo-form');
    const todoId = form.dataset.editingId; 
    
    if (!todoId || !activeProject) return;


    const todoToUpdate = findTodoById(activeProject.name, todoId);

    if (todoToUpdate) {
  const updates = { name, description, dueDate, priority };
  todoToUpdate.update(updates);
  persistData(); 
}

   
    form.dataset.editingId = ''; 
    form.querySelector('button[type="submit"]').textContent = 'Save'; 
    form.reset();
    form.style.display = 'none';
    

    handleProjectSelection(activeProject.name); 
}

function handleTodoDeletion(projectName, todoId) {
  if (!activeProject) return;
  deleteFromProject(projectName, todoId);
  persistData(); 
  handleProjectSelection(activeProject.name);
}


document.addEventListener('DOMContentLoaded', initializeApp);