export const PERSISTANCE_MODES = {
    file: "FILE",
    memory: "MEMORY",
    db: "DATABASE"
}

export const PERSISTANCE_MODE = PERSISTANCE_MODES.memory
export const CNX_STR = "mongodb://admin:admin@localhost:27017?retryWrites=true&writeConcern=majority"