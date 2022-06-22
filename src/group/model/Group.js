import { errorTypes } from '../../error/errorTypes.js'
import { getNewId } from '../../utils/models/ids.js'


export const createGroup = (data, ID = getNewId('group')) => {
    validate(data)

    return {
        id: ID,
        name: data.name,
        ordinal: data.ordinal,
        area: data.area,
        avgQty: data.avgQty,
    }
}

const validate = (data) => {
    try {
        if (!data.name) { throw new Error('Name is mandatory') }
        if (!data.ordinal) { throw new Error('Ordinal is mandatory') }
        if (isNaN(Number(data.ordinal))) { throw new Error('Ordinal should be numeric') }
        if (!data.area) { throw new Error('Area is mandatory') }
        if (data.avgQty && isNaN(Number(data.avgQty))) { throw new Error('Average Quantity should be numeric') }
    } catch (err) {
        err.type = errorTypes.badRequest
        throw err
    }
}