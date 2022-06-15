import Router from 'express'
import * as groupController from '../controller/groupController.js'

export const groupRouter = new Router()

groupRouter.get('/', groupController.getGroups)
groupRouter.get('/:id', groupController.getGroup)
groupRouter.post('/', groupController.addGroup)
groupRouter.put('/:id', groupController.updateGroup)
groupRouter.delete('/:id', groupController.deleteGroup)