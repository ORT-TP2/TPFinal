import { errorTypes } from '../../error/errorTypes.js'
import { getNewId } from '../../utils/ids.js'


export const createParticipant = (data, ID = getNewId('participant')) => {
    validate(data)

    return {
        id: ID,
        name: data.name,
        classOf: data.classOf,
    }
}

const validate = (data) => {
    try {
        if (!data.name) { throw new Error('Name is mandatory') }
        if (!data.classOf) { throw new Error("'Class of' is mandatory") }
        if (isNaN(Number(data.classOf))) { throw new Error('Class should be numeric') }
    } catch (err) {
        err.type = errorTypes.badRequest
        throw err
    }
}