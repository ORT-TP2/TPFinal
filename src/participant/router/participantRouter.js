import Router from 'express'
import { getParticipantsController , getParticipantController , addParticipantController, updateParticipantController, deleteParticipantController } from '../controller/participantController.js'

export const participantsRouter = new Router()

participantsRouter.get('/', getParticipantsController)

participantsRouter.get('/:id', getParticipantController)

participantsRouter.post('/', addParticipantController)

participantsRouter.put('/:id', updateParticipantController)

participantsRouter.delete('/:id', deleteParticipantController)