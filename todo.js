 const VALID_PRIORITIES = ['low', 'medium', 'high'];

 export class Todo {
    static validate(data) {
        const errors = [];

        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
            errors.push("Name is required and must be a non-empty string.");
        }

        if (data.dueDate && typeof data.dueDate !== 'string') {
             errors.push("Due Date must be a string (e.g., 'YYYY-MM-DD').");
        }

        if (data.priority && !VALID_PRIORITIES.includes(data.priority.toLowerCase())) {
            errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}.`);
        }

        if (data.completed !== undefined && typeof data.completed !== 'boolean') {
             errors.push("Completed status must be a boolean.");
        }

        if (errors.length > 0) {
            throw new Error(`Validation Failed: \n- ${errors.join('\n- ')}`);
        }

        return data;
    }

    constructor(name, description, dueDate, priority, completed, notes){
this.id = crypto.randomUUID()
this.name = name 
this.description = description || "";
this.dueDate = dueDate;
this.priority = priority;
this.completed = completed || false;
this.notes = notes || "";
    }

    toggleComplete(){
        this.completed = this.completed === true ? false : true
    }

    update(updates){
        Object.assign(this, updates)
    }
}