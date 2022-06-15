import * as groupService from "../service/groupService.js"

export const getGroups = (req, res) => {
    res.json(groupService.getGroups())
}

export const getGroup = (req, res) => {
    res.json(groupService.getGroup(req.params.id))
}

export const addGroup = (req, res) => {
    res.status(201).json(groupService.addGroup(req.body))
}


export const updateGroup = (req, res) => {
    res.json(groupService.updateGroup(req.params.id, req.body))
}

export const deleteGroup = (req, res) => {
    res.json(groupService.deleteGroup(req.params.id))
}