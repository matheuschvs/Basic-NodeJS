import http from 'node:http'

const tasks = []

const server = http.createServer((req, res) => {
    const { method, url } = req
    
    res.setHeader('Content-type', 'application/json')

    if (method === 'GET' && url === '/tasks') {
        return res.writeHead(200).end(JSON.stringify(tasks))
    }
    
    if (method === 'POST' && url === '/tasks') {
        tasks.push({
            id: 1,
            title: 'Task 01',
            description: 'Descrição da Task 01',
            completed_at: null,
            created_at: Date.now().toLocaleString(),
            updated_at: Date.now().toLocaleString()
        })

        return res.writeHead(200).end(JSON.stringify(tasks))
    }

    return res.writeHead(404).end('Resource not found')

})

server.listen(3333)
