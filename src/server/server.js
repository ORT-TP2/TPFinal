import express from 'express'
import { participantRouter } from '../participant/router/participantRouter.js'
import { groupRouter } from '../group/router/groupRouter.js'
import { errorHandler } from '../error/errorHandler.js'

const app = express()
app.use(express.json())
app.use('/participants', participantRouter)
app.use('/groups', groupRouter)
app.use(errorHandler)

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