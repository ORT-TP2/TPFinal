import Router from 'express'
import { getParticipants, addParticipant, getParticipant, replaceParticipant, removeParticipant } from '../participant/participants.js'

export const participantsRouter = new Router()

participantsRouter.get('/', (req, res) => {
    res.json(getParticipants())
})

participantsRouter.get('/:id', (req, res) => {
    try {
        res.json(getParticipant(req.params.id))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

participantsRouter.post('/', (req, res) => {
    try {
        res.status(201).json(addParticipant(req.body))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

participantsRouter.put('/:id', (req, res) => {
    try {
        res.json(replaceParticipant(req.params.id, req.body))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

participantsRouter.delete('/:id', (req, res) => {
    try {
        res.json(removeParticipant(req.params.id))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})