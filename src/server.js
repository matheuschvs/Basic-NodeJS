import http from 'node:http'
import { json } from './middlewares/json.js'

const tasks = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    
    await json(req, res)

    if (method === 'GET' && url === '/tasks') {
        return res.writeHead(200).end(JSON.stringify(tasks))
    }
    
    if (method === 'POST' && url === '/tasks') {
        const { title, description } = req.body
        const now = new Date()

        tasks.push({
            id: 1,
            title,
            description,
            completed_at: null,
            created_at: now.toLocaleString(),
            updated_at: now.toLocaleString()
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end('Resource not found')

})

server.listen(3333)
