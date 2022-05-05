import { getNewId } from "../utils/ids.js"

const groups = []

export const getGroups = () => {
    return [...groups]
}

export const getGroup = (id) => {
    const group = groups.find(p => p.id == id)
    if (!group) {
        const err = new Error(`Not found for id: ${id}`)
        err.statusCode = 404
        throw err
    }
    return group
}

export const addGroup = (data) => {
    const group = createGroup(data)
    groups.push(group)
    return group
}

export const replaceGroup = (id, data) => {
    const group = getGroup(id)
    const newGroup = createGroup(data)
    groups.splice(groups.indexOf(group))
    groups.push(newGroup)
    return newGroup
}

export const removeGroup = (id) => {
    const group = getGroup(id)
    groups.splice(groups.indexOf(group))
}

const createGroup = (data) => {
    validate(data)

    return {
        id: getNewId(groups),
        name: data.name,
        ordinal: data.ordinal,
        area: data.area,
        avgQty: data.avgQty,
    }
}

const validate = (data) => {
    try {
        if (!data.name) { throw new Error('Name is mandatory') }
        if (!data.ordinal) { throw new Error('Ordinal is mandatory') }
        if (isNaN(Number(data.ordinal))) { throw new Error('Ordinal should be numeric') }
        if (!data.area) { throw new Error('Area is mandatory') }
        if (data.avgQty && isNaN(Number(data.avgQty))) { throw new Error('Average Quantity should be numeric') }
    } catch (err) {
        err.statusCode = 400
        throw err
    }
}
