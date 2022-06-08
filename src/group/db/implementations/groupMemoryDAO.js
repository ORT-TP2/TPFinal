import { errorTypes } from '../../../error/errorTypes.js'

const groups = []

export const groupDAO = {
    getAll: () => {
        return [...groups]
    },
    getOne: (id) => {
        const group = groups.find(g => g.id === id)
        if (!group) {
            const error = new Error(`Group not found for id ${id}`)
            error.type = errorTypes.notFound
            throw error
        }
        return group
    },
    add: (group) => {
        groups.push(group)
    },
    update: (id, group) => {
        this.delete(id)
        this.add(group)
    },
    delete: (id) => {
        groups.splice(groups.indexOf(this.getOne(id)))
    }   
}