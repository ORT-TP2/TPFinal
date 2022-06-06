import { PERSISTANCE_MODE, PERSISTANCE_MODES } from '../../config/config.js'
import * as fileDAO from './groupMemoryDAO.js'
import * as dbDAO from './groupMemoryDAO.js'
import * as memoryDAO from './groupMemoryDAO.js'

let dao

switch (PERSISTANCE_MODE) {
    case PERSISTANCE_MODES.file:
        dao = fileDAO
        break
    case PERSISTANCE_MODES.db:
        dao = dbDAO
        break
    default:
        dao = memoryDAO
        break
}

export default dao