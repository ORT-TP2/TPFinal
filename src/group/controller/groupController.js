import { getGroups, getGroup, addGroup, replaceGroup, removeGroup } from "../service/groupService.js"

export const getGroupsController = (req, res) => {
    res.json(getGroups())
}

export const getGroupController = (req, res, next) => {
    res.json(getGroup(req.params.id))
}

export const addGroupController = (req, res, next) => {
    res.status(201).json(addGroup(req.body))
}


export const updateGroupController = (req, res, next) => {
    res.json(replaceGroup(req.params.id, req.body))
}

export const deleteGroupController = (req, res, next) => {
    res.json(removeGroup(req.params.id))
}