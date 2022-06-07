import { dao } from '../db/groupDAOSelector.js'
import { createGroup } from '../model/Group.js'

export const getGroups = () => {
    return dao.getGroups()
}

export const getGroup = (id) => {
    return dao.getGroup(id)
}

export const addGroup = (data) => {
    const group = createGroup(data)
    dao.addGroup(group)
    return group
}

export const replaceGroup = (id, data) => {
    const newGroup = createGroup(data)
    dao.replaceGroup(id, newGroup)
    return newGroup
}

export const removeGroup = (id) => {
    dao.deleteGroup(id)
}
