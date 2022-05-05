import express from 'express'
import { getParticipants, addParticipant, getParticipant, replaceParticipant } from '../participants/participants.js'

const app = express()

app.use(express.json())

app.get('/ping', (req, res) => {
    res.json('pong')
})

app.get('/participants', (req, res) => {
    res.json(getParticipants())
})

app.get('/participants/:id', (req, res) => {
    try {
        res.json(getParticipant(req.params.id))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

app.post('/participants', (req, res) => {
    try {
        res.status(201).json(addParticipant(req.body))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

app.put('/participants/:id', (req, res) => {
    try {
        res.json(replaceParticipant(req.params.id, req.body))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

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