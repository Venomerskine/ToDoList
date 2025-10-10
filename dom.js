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