import { getNewId } from "../utils/ids.js"

const participants = []

export const getParticipants = () => {
    return [...participants]
}

export const getParticipant = (id) => {
    const participant = participants.find(p => p.id == id)
    if (!participant) { throw new Error('Not found') }
    return participant
}

export const addParticipant = (data) => {
    const participant = createParticipant(data)
    participants.push(participant)
    return participant
}

const createParticipant = (data) => {
    if (!data.name) { throw new Error('Name is mandatory') }
    if (!data.classOf) { throw new Error("'Class of' is mandatory") }
    if (isNaN(Number(data.classOf))) { throw new Error('Class should be numeric') }
    return {
        id: getNewId(participants),
        name: data.name,
        classOf: data.classOf,
    }
}