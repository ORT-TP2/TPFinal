import { start } from './server/server.js'

const port = await start(8080)
console.log(`Server listening on port ${port}`)

