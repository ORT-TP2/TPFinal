import { start } from './server.js'

const port = await start()
console.log(`Server listening on port ${port}`)

