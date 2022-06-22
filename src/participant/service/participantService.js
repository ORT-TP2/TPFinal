import { dao as participantDAO } from '../db/participantDAOSelector.js'
import { createParticipant } from '../model/Participant.js'

export const getParticipants = () => {
    return participantDAO.getParticipants()
}

export const getParticipant = (id) => {
    return participantDAO.getParticipant(id)
}

export const addParticipant = (data) => {
    const participant = createParticipant(data)
    participantDAO.addParticipant(participant)
    return participant
}

export const updateParticipant = (id, data) => {
    const newParticipant = createParticipant(data, id)
    participantDAO.updateParticipant(id, newParticipant)
    return newParticipant
}

export const deleteParticipant = (id) => {
    participantDAO.deleteParticipant(id)
}
