import { groupService as service } from "../service/groupService.js"

export const groupController = {
    getAll: (req, res) => {
        res.json(service.getAll())
    },

    getOne: (req, res) => {
        res.json(service.getOne(req.params.id))
    },
    add: (req, res) => {
        res.status(201).json(service.add(req.body))
    },
    update: (req, res) => {
        res.json(service.update(req.params.id, req.body))
    },
    delete: (req, res) => {
        res.json(service.delete(req.params.id))
    }
}