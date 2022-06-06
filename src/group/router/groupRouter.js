import Router from 'express'
import { getGroupsController , getGroupController , addGroupController, updateGroupController, deleteGroupController } from '../controller/groupController.js'

export const groupsRouter = new Router()

groupsRouter.get('/', getGroupsController)

groupsRouter.get('/:id', getGroupController)

groupsRouter.post('/', addGroupController)

groupsRouter.put('/:id', updateGroupController)

groupsRouter.delete('/:id', deleteGroupController)