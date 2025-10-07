import {Todo} from './todo.js'

export class Project {
    constructor (name, description) {
        this.name = String(name);
        this.decription = String(description)
        this.todos = []
    }

    addTodo(todo){
        if (todo instanceof Todo){
            this.todos.push(todo)
            console.log(`${todo.name} added to the project`)
        } else {
            console.error("Iinvalid object. Only car instance can be added")
        }
    }

    listTodos() {
        console.log("Todos in the project")
        this.todos.forEach(todo => {
            console.log(`-${todo.name}`)
        })
    }

}

