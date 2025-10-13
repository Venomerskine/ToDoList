// Get app container that holds everything
const appContainer = document.getElementById('app')

// Create DOM elemnts for all projects and render them to the sidebar
export function renderProjects(projects){
    // Set up the main structure if it does not exist
    if (!appContainer.querySelector('#sidebar')) {
        appContainer.innerHTML =`
        <header>To-Do App</header>
        <div id="sidebar">
            <h2>Projects</h2>
            <ul id="project-list"></ul>
            <button id="add-project-btn" >Add New Project</button>
        </div>
        <main id="project-details">
            <h2>Welcome! Select aproject to begin.</h2>
        </main>
        `
    }

    const projectListUl = document.getElementById('project-list')

    if (!projectListUl) return;

    projectListUl.innerHTML = ''

    projects.forEach(project => {
        const li = document.createElement('li')
        li.dataset.projectName = project.name;
        li.textContent = project.name
        li.classList.add('project-list-item')
        projectListUl.appendChild(li)
    });
}

// Render the to-do of the selected project in the main content area.
export function renderTodos(project) {
    const mainContent = document.getElementById('project-details')
    if(!mainContent) return 

    const todosHtml = project.todos.map(todo => 
        `<div class = "todo-item" data-todo-id = "${todo.id}" >
            <input type = "checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.name} (Due: ${todo.dueDate || 'N/A'}) [${todo.priority}]</span>
            <button class = "delete-todo-btn" data-todo-id = "${todo.id}" >Delete</button>
        </div>
        `
    ).join('')

    mainContent.innerHTML = `
        <h2>Project: ${project.name}</h2>
        <p>${project.description}</p>
        <hr>
        <h3>To-Dos</h3>
        <div id="todos-container">${todosHtml}</div>
        <button id="add-todo-btn">Add New To-Do</button>
    `
}

// --- Event Binding Functions --- //

// Open form (purely visual)
export function bindOpenProjectForm() {
  const addProjectBtn = document.getElementById('add-project-btn');
  const form = document.getElementById('project-form');
  if (!addProjectBtn || !form) return;

  addProjectBtn.addEventListener('click', () => {
    form.style.display = 'block';
  });
}

//Handler function to when a project is created
export function bindAppProject(handler) {
const form = document.getElementById('project-form')
if (!form) return

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.querySelector('#project_name').value.trim()
    const description = form.querySelector('#project_description').value.trim()

    handler(name, description)

    form.reset();
    form.style.display = 'none'
})
}

// Click handler to the project list in the sidebar.
export function bindProjectClick(handler) {
    const projectListUl = document.getElementById('project-list');
    if(!projectListUl) return

    projectListUl.addEventListener('click', (e) => {
        const li = e.target.closest('.project-list-item')
        if (li) {
            handler(li.dataset.projectName)
        }
    })
}


// open todo form
export function bindOpenTodoForm() {
    const addTodoBtn  = document.getElementById('add-todo-btn')
    const form = document.getElementById('todo-form')
    if(!addTodoBtn || !form) return

    addTodoBtn.addEventListener('click', () => {
        form.style.display = 'block'
    })
}

//Event listener to the Add Todo button
export function bindAddTodo (handler) {
   const form = document.getElementById('todo-form')
    if(!form) return;

    const activeProjectName = document.querySelector('#project-details h2').textContent.replace('Project:', '').trim();

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const todoName = document.getElementById('todoName').value.trim()
        const todoDescription = document.getElementById('todoDescription').value.trim()
        const todoDueDate = document.getElementById('todoDueDate').value.trim()
        const todoPriority = document.getElementById('todoPriority').value.trim()

        handler(todoName, todoDescription, todoDueDate, todoPriority)

        form.reset()
        form.style.display = 'none'
    })
}

// Todo delete button event listener
export function bindDeleteTodo(handler) {
    const todoContainer = document.getElementById('todo-container');
    if(!todoContainer) return

     const activeProjectName = document.querySelector('#project-details h2').textContent.replace('Project: ', '');

    todoContainer.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.delete-todo-btn');
        if (deleteButton) {
            const todoId = deleteButton.dataset.todoId;
            handler(activeProjectName, todoId);
        }
    });
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