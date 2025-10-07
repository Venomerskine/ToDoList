 export class Todo {
    constructor(name, description, dueDate, priority, completed, notes){
this.id = crypto.randomUUID()
this.name = String(name);
this.description = String(description);
this.dueDate = String(dueDate);
this.priority = String(priority);
this.completed = Boolean(completed);
this.notes = String(notes);
    }

    toggleComplete(){
        this.completed === true ? false : true
    }
}