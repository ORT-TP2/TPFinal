import express from 'express'
import { participantsRouter } from '../participants/participantRouter.js'
import { groupsRouter } from '../groups/groupRouter.js'

const app = express()
app.use(express.json())
app.use('/participants', participantsRouter)
app.use('/groups', groupsRouter)

let server

export const start = (port = 0) => {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve(server.address().port)
        })
        server.on('error', (err) => {
            reject(err)
        })
    })
}

export const stop = () => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}