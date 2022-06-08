import { errorTypes } from '../../../error/errorTypes.js'

const participants = []

export const getParticipants = () => {
    return [...participants]
}

export const getParticipant = (id) => {
    const participant = participants.find(p => p.id === id)
    if (!participant) {
        const error = new Error(`Participant not found for id ${id}`)
        error.type = errorTypes.notFound
        throw error
    }
    return participant
}

export const addParticipant = (participant) => {
    participants.push(participant)
}

export const deleteParticipant = (id) => {
    participants.splice(participants.indexOf(getParticipant(id)))
}

export const replaceParticipant = (id, participant) => {
    deleteParticipant(id)
    addParticipant(participant)
}