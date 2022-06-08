import Router from 'express'
import { groupController }  from '../controller/groupController.js'

export const groupRouter = new Router()

groupRouter.get('/', groupController.getAll)
groupRouter.get('/:id', groupController.getOne)
groupRouter.post('/', groupController.add)
groupRouter.put('/:id', groupController.update)
groupRouter.delete('/:id', groupController.delete)