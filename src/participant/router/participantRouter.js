import Router from 'express'
import * as participantController from '../controller/participantController.js'

export const participantRouter = new Router()

participantRouter.get('/', participantController.getParticipants)
participantRouter.get('/:id', participantController.getParticipant)
participantRouter.post('/', participantController.addParticipant)
participantRouter.put('/:id', participantController.updateParticipant)
participantRouter.delete('/:id', participantController.deleteParticipant)