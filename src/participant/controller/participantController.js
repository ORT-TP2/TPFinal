import * as participantService from "../service/participantService.js"

export const getParticipants = (req, res) => {
    res.json(participantService.getParticipants())
}

export const getParticipant = (req, res) => {
    res.json(participantService.getParticipant(req.params.id))
}

export const addParticipant = (req, res) => {
    res.status(201).json(participantService.addParticipant(req.body))
}


export const updateParticipant = (req, res) => {
    res.json(participantService.updateParticipant(req.params.id, req.body))
}

export const deleteParticipant = (req, res) => {
    res.json(participantService.deleteParticipant(req.params.id))
}