import { errorTypes } from '../../error/errorTypes.js'
import { getNewId } from '../../utils/ids.js'


export const createParticipant = (data) => {
    validate(data)

    return {
        id: getNewId('participant'),
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