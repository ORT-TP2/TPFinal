import { PERSISTANCE_MODE, PERSISTANCE_MODES } from '../../config/config.js'
import * as fileDAO from './implementations/participantMemoryDAO.js'
import * as dbDAO from './implementations/participantDatabaseDAO.js'
import * as memoryDAO from './implementations/participantMemoryDAO.js'

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