export class Database {
    #database

    constructor() {
        this.#database = {}
    }

    insert(table, data) {
        if (!this.#database[table]) {
            this.#database[table] = []
        }

        this.#database[table].push(data)
    }

    select(table) {
        return this.#database[table]
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        
        if (rowIndex > -1) {
            const existingTask = this.#database[table][rowIndex]
            
            this.#database[table][rowIndex] = {
                ...existingTask,
                ...data,
                id: existingTask.id,
                created_at: existingTask.created_at,
                completed_at: existingTask.completed_at
            }
            return true
        }
        return false
    }

    completeTask(table, id, completedAt) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            const task = this.#database[table][rowIndex]
            if (task.completed_at) {
                return false;
            }
            task.completed_at = completedAt
            task.updated_at = completedAt
            return true
        }
        return false
    }

    delete(table, id) {
        const initialLength = this.#database[table] ? this.#database[table].length : 0

        if (this.#database[table]) {
            this.#database[table] = this.#database[table].filter(row => row.id !== id)
        }
        
        return (this.#database[table] ? this.#database[table].length : 0) < initialLength
    }
}