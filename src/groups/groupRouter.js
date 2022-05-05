import Router from 'express'
import { getGroups, addGroup, getGroup, replaceGroup, removeGroup } from '../groups/groups.js'

export const groupsRouter = new Router()

groupsRouter.get('/', (req, res) => {
    res.json(getGroups())
})

groupsRouter.get('/:id', (req, res) => {
    try {
        res.json(getGroup(req.params.id))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

groupsRouter.post('/', (req, res) => {
    try {
        res.status(201).json(addGroup(req.body))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

groupsRouter.put('/:id', (req, res) => {
    try {
        res.json(replaceGroup(req.params.id, req.body))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})

groupsRouter.delete('/:id', (req, res) => {
    try {
        res.json(removeGroup(req.params.id))
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message })
    }
})