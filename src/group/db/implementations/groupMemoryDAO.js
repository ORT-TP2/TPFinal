import { errorTypes } from '../../../error/errorTypes.js'

const groups = []

export const getGroups = () => {
    return [...groups]
}

export const getGroup = (id) => {
    const group = groups.find(g => g.id === id)
    if (!group) {
        const error = new Error(`Group not found for id ${id}`)
        error.type = errorTypes.notFound
        throw error
    }
    return group
}

export const addGroup = (group) => {
    groups.push(group)
}

export const deleteGroup = (id) => {
    groups.splice(groups.indexOf(getGroup(id)))
}

export const replaceGroup = (id, group) => {
    deleteGroup(id)
    addGroup(group)
}