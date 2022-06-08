import { getParticipants, getParticipant, addParticipant, replaceParticipant, removeParticipant } from "../service/participantService.js"

export const getParticipantsController = (req, res) => {
    res.json(getParticipants())
}

export const getParticipantController = (req, res) => {
    res.json(getParticipant(req.params.id))
}

export const addParticipantController = (req, res) => {
    res.status(201).json(addParticipant(req.body))
}


export const updateParticipantController = (req, res) => {
    res.json(replaceParticipant(req.params.id, req.body))
}

export const deleteParticipantController = (req, res) => {
    res.json(removeParticipant(req.params.id))
}