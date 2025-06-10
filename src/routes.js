import { randomUUID } from 'node:crypto'

const tasks = []

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body
            const now = new Date()

            tasks.push({
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: now.toLocaleString(),
                updated_at: now.toLocaleString()
            })

            return res.writeHead(201).end()
        }
    },

]