import { getParticipants, getParticipant, addParticipant, replaceParticipant, removeParticipant } from "../service/participantService.js"

export const getParticipantsController = (req, res) => {
    res.json(getParticipants())
}

export const getParticipantController = (req, res, next) => {
    try {
        res.json(getParticipant(req.params.id))
    } catch (error) {
        next(error)
    }
}

export const addParticipantController = (req, res, next) => {
    try {
        res.status(201).json(addParticipant(req.body))
    } catch (error) {
        next(error)
    }
}


export const updateParticipantController = (req, res, next) => {
    try {
        res.json(replaceParticipant(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
}

export const deleteParticipantController = (req, res, next) => {
    try {
        res.json(removeParticipant(req.params.id))
    } catch (error) {
        next(error)
    }
}