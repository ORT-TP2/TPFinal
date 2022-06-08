import { getParticipants, getParticipant, addParticipant, replaceParticipant, removeParticipant } from "../service/participantService.js"

export const getParticipantsController = (req, res) => {
    res.json(getParticipants())
}

export const getParticipantController = (req, res, next) => {
    res.json(getParticipant(req.params.id))
}

export const addParticipantController = (req, res, next) => {
    res.status(201).json(addParticipant(req.body))
}


export const updateParticipantController = (req, res, next) => {
    res.json(replaceParticipant(req.params.id, req.body))
}

export const deleteParticipantController = (req, res, next) => {
    res.json(removeParticipant(req.params.id))
}