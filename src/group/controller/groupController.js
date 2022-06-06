import { getGroups, getGroup, addGroup, replaceGroup, removeGroup } from "../service/groupService.js"

export const getGroupsController = (req, res) => {
    res.json(getGroups())
}

export const getGroupController = (req, res, next) => {
    try {
        res.json(getGroup(req.params.id))
    } catch (error) {
        next(error)
    }
}

export const addGroupController = (req, res, next) => {
    try {
        res.status(201).json(addGroup(req.body))
    } catch (error) {
        next(error)
    }
}


export const updateGroupController = (req, res, next) => {
    try {
        res.json(replaceGroup(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
}

export const deleteGroupController = (req, res, next) => {
    try {
        res.json(removeGroup(req.params.id))
    } catch (error) {
        next(error)
    }
}