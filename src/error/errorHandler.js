import { errorTypes } from './errorTypes.js'

export const errorHandler = (error, req, res, next) => {
    switch (error.type) {
        case errorTypes.badRequest:
            res.status(400)
            break

        case errorTypes.notFound:
            res.status(404)
            break

        case errorTypes.database:
            res.status(500)
            error.message = `Database Error - Message: ${error.message}`
            break

        default:
            res.status(500)
            error.message = `Unexpected Error - Message: ${error.message}`
    }
    res.json({ message: error.message })
}