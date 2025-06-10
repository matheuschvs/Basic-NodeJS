import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url)

async function importTasks() {
    const stream = fs.createReadStream(csvPath)

    const csvParse = parse({
        columns: true,
        skip_empty_lines: true
    })

    for await (const line of stream.pipe(csvParse)) {
        const { title, description } = line
        
        try {
            const response = await fetch('http://localhost:3333/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description })
            })

            if (response.ok) {
                console.log(`Task "${title}" imported successfully.`)
            } else {
                const errorData = await response.json().catch(() => ({ message: response.statusText }))
                console.error(`Failed to import task "${title}": status ${response.status}, Error: ${errorData.message}`)
            }
        } catch (error) {
            console.error(`Error sending request for task "${title}":`, error,message)
        }
    }

    console.log('CSV import finished')
}

importTasks()
