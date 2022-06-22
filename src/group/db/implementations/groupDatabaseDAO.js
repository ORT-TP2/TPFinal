import { errorTypes } from '../../../error/errorTypes.js'

import { database } from '../../../utils/database/mongoDbClient.js';

const groups = database.collection('groups');

export const getGroups = async () => {
    try {
        await groups.find().project({ _id: 0 }).toArray()
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }
}

export const getGroup = async (id) => {
    let group
    try {
        group = await groups.findOne({ id }, { projection: { _id: 0 } })
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }

    if (!group) {
        const error = new Error(`Group not found for id ${id}`) 
        error.type = errorTypes.notFound
        throw error
    }

    return group
}

export const addGroup = async (group) => {
    try {
        await groups.insertOne(group)
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }
}

export const deleteGroup = async (id) => {
    let result
    try {
        result = await groups.deleteOne({ id })
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }

    if (result.deletedCount === 0) {
        const error = new Error(`Group not found for id ${id}`) 
        error.type = errorTypes.notFound
        throw error
    }
}

export const updateGroup = async (id, group) => {
    await deleteGroup(id)
    await addGroup(group)
}