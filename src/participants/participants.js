import { getNewId } from "../utils/ids.js"

const participants = []

export const getParticipants = () => {
    return [...participants]
}

export const getParticipant = (id) => {
    const participant = participants.find(p => p.id == id)
    if (!participant) {
        const err = new Error(`Not found for id: ${id}`)
        err.statusCode = 404
        throw err
    }
    return participant
}

export const addParticipant = (data) => {
    const participant = createParticipant(data)
    participants.push(participant)
    return participant
}

export const replaceParticipant = (id, data) => {
    const participant = getParticipant(id)
    const newParticipant = createParticipant(data)
    participants.splice(participants.indexOf(participant))
    participants.push(newParticipant)
    return newParticipant
}

const createParticipant = (data) => {
    validate(data)

    return {
        id: getNewId(participants),
        name: data.name,
        classOf: data.classOf,
    }
}

const validate = (data) => {
    try {
        if (!data.name) { throw new Error('Name is mandatory') }
        if (!data.classOf) { throw new Error("'Class of' is mandatory") }
        if (isNaN(Number(data.classOf))) { throw new Error('Class should be numeric') }
    } catch (err) {
        err.statusCode = 400
        throw err
    }
}
