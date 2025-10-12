import { 
  renderProjects,
  renderTodos,
  bindOpenProjectForm, 
  bindAppProject, 
  bindOpenTodoForm, 
  bindAddTodo,
  bindProjectClick 
} from './dom.js';

import { 
  createProject, 
  listProjects, 
  createTodoAndAddToProject ,
  findProjectByName
} from './logic.js';

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

    bindOpenTodoForm(); 
    bindAddTodo(handleTodoCreation);
}

function handleProjectCreation(name, description) {
    createProject(name, description);
    renderProjects(listProjects());
    bindOpenProjectForm(); 
    bindProjectClick(handleProjectSelection); 
}

function handleProjectSelection(projectName) {
    activeProject = findProjectByName(projectName);
    if (activeProject) {
        renderTodos(activeProject);
        bindOpenTodoForm(); 
        bindAddTodo(handleTodoCreation);
    }
}

function handleTodoCreation(name, description, dueDate, priority) {
    if (!activeProject) {
        console.error("Cannot add todo: No project is currently active.");
        return;
    }
    

    createTodoAndAddToProject(activeProject.name, name, description, dueDate, priority);

    renderTodos(activeProject); 
    bindOpenTodoForm(); 
}

document.addEventListener('DOMContentLoaded', initializeApp);










