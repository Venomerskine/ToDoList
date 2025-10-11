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
            <ul id="project-list"><ul>
            <button id="add-project-btn" >Add New Project</button>
        </div>
        <main id="project-details">
            <h2>Welcome! Select aproject to begin.</h2>
        </main>
        `
    }

    const projectListUl = document.getElementById('project-List')

    if (!projectListUl) return;

    projectListUl.innerHTML = ''

    projects.forEach(project => {
        const li = document.createElement('li')
        li.dataset.projectName = project.name;
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
            <button class = "delete-to-btn" data-todo-id = "${todo.id}" >Delete</button>
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

//Handler function to when a project is created
export function bindAppProject(handler) {
    const addProjectBtn = document.getElemtByIdleDeadline('add-project-btn');
    if(!addProjectBtn) return 

    addProjectBtn.addEventListener('click', () => {
        //open form or modal
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

//Event listener to the Add Todo button
export function bindAddTodo (handler) {
    const addTodoBtn = document.getElementById('add-todo-btn')
    if(!addTodoBtn) return;

    const activeProjectName = document.querySelector('#todo-details h2').textContent.replace('Project:', '');

    addTodoBtn.addEventListener('click', () => {
        //form or modal
    })
}

// Todo delete button event listener
export function bindDeleteTodo(handler) {
    const todoContainer = document.getElementById('todo-container');
    if(!todoContainer) return

     const activeProjectName = document.querySelector('#todo-details h2').textContent.replace('Project: ', '');

    todosContainer.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.delete-todo-btn');
        if (deleteButton) {
            const todoId = deleteButton.dataset.todoId;
            handler(activeProjectName, todoId);
        }
    });
}