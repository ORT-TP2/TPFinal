import { groupDAO as dao } from '../db/groupDAOSelector.js'
import { createGroup } from '../model/Group.js'

export const groupService = {
    getAll: () => {
        return dao.getAll()
    },
    getOne: (id) => {
        return dao.getOne(id)
    },
    add: (data) => {
        const group = createGroup(data)
        dao.add(group)
        return group
    },
    update: (id, data) => {
        const newGroup = createGroup(data, id)
        dao.update(id, newGroup)
        return newGroup
    },
    delete: (id) => {
        dao.delete(id)
    }
}