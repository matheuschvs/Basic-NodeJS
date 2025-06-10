import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')

            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const now = new Date()

            if (!title || !description) {
                return res.writeHead(400).end(JSON.stringify({ message: 'Title and description are required.' }))
            }
            
            database.insert('tasks', {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: now.toISOString(),
                updated_at: now.toISOString()
            })

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body
            const now = new Date()

            if (!title && !description) {
                return res.writeHead(400).end(JSON.stringify({message: 'At least title or description must be provided for update.'}))
            }

            const updated = database.update('tasks', id, {title, description, updated_at: now.toISOString()})

            if (!updated) {
                return res.writeHead(404).end(JSON.stringify({message: 'Task not found.'}))
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            const now = new Date()

            const completed = database.completeTask('tasks', id, now.toISOString())

            if (!completed) {
                return res.writeHead(404).end(JSON.stringify({ message: 'Task not found or already completed.' }))
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const deleted = database.delete('tasks', id)

            if (!deleted) {
                return res.writeHead(404).end(JSON.stringify({ message: 'Task not found.' }))
            }

            return res.writeHead(204).end()
        }
    }
]