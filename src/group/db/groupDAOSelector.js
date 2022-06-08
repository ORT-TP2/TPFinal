import { PERSISTANCE_MODE, PERSISTANCE_MODES } from '../../config/config.js'
import { groupDAO as fileDAO } from './implementations/groupMemoryDAO.js'
import { groupDAO as dbDAO } from './implementations/groupMemoryDAO.js'
import { groupDAO as memoryDAO } from './implementations/groupMemoryDAO.js'

export let groupDAO

switch (PERSISTANCE_MODE) {
    case PERSISTANCE_MODES.file:
        groupDAO = fileDAO
        break
    case PERSISTANCE_MODES.db:
        groupDAO = dbDAO
        break
    default:
        groupDAO = memoryDAO
        break
}