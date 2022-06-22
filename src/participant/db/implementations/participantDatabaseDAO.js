import { errorTypes } from '../../../error/errorTypes.js'

import { database } from '../../../utils/database/mongoDbClient.js';

const participants = database.collection('participants');

export const getParticipants = async () => {
    try {
        await participants.find().project({ _id: 0 }).toArray()
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }
}

export const getParticipant = async (id) => {
    let participant
    try {
        participant = await participants.findOne({ id }, { projection: { _id: 0 } })
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }

    if (!participant) {
        const error = new Error(`Participant not found for id ${id}`) 
        error.type = errorTypes.notFound
        throw error
    }

    return participant
}

export const addParticipant = async (participant) => {
    try {
        await participants.insertOne(participant)
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }
}

export const deleteParticipant = async (id) => {
    let result
    try {
        result = await participants.deleteOne({ id })
    } catch (error) {
        error.type = errorTypes.database
        throw error
    }

    if (result.deletedCount === 0) {
        const error = new Error(`Participant not found for id ${id}`) 
        error.type = errorTypes.notFound
        throw error
    }
}

export const updateParticipant = async (id, participant) => {
    await deleteParticipant(id)
    await addParticipant(participant)
}