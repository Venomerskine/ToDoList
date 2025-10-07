 export class Todo {
    constructor(name, description, dueDate, priority, completed, notes){
this.id = crypto.randomUUID()
this.name = name 
this.description = description || "";
this.dueDate = dueDate;
this.priority = priority;
this.completed = completed;
this.notes = notes || "";
    }

    toggleComplete(){
        this.completed = this.completed === true ? false : true
    }

    update(updates){
        Object.assign(this, updates)
    }
}