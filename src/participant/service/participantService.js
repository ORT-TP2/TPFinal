import { dao } from '../db/participantDAOSelector.js'
import { createParticipant } from '../model/Participant.js'

export const getParticipants = () => {
    return dao.getParticipants()
}

export const getParticipant = (id) => {
    return dao.getParticipant(id)
}

export const addParticipant = (data) => {
    const participant = createParticipant(data)
    dao.addParticipant(participant)
    return participant
}

export const replaceParticipant = (id, data) => {
    const newParticipant = createParticipant(data)
    dao.replaceParticipant(id, newParticipant)
    return newParticipant
}

export const removeParticipant = (id) => {
    dao.deleteParticipant(id)
}
