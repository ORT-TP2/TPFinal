import { dao as groupDAO } from '../db/groupDAOSelector.js'
import { createGroup } from '../model/Group.js'

export const getGroups = () => {
    return groupDAO.getGroups()
}

export const getGroup = (id) => {
    return groupDAO.getGroup(id)
}

export const addGroup = (data) => {
    const group = createGroup(data)
    groupDAO.addGroup(group)
    return group
}

export const updateGroup = (id, data) => {
    const newGroup = createGroup(data)
    groupDAO.updateGroup(id, newGroup)
    return newGroup
}

export const deleteGroup = (id) => {
    groupDAO.deleteGroup(id)
}
