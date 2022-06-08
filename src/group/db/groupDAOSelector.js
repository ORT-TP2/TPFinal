import { PERSISTANCE_MODE, PERSISTANCE_MODES } from '../../config/config.js'
import * as fileDAO from './implementations/groupMemoryDAO.js'
import * as dbDAO from './implementations/groupMemoryDAO.js'
import * as memoryDAO from './implementations/groupMemoryDAO.js'

export let dao

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