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
        <main id="todo-details">
            <h2>Welcome! Select aproject to begin.</h2>
        </main>
        `
    }
}