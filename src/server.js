import express from 'express'

const app = express()

app.use(express.json())

app.get('/ping', (req, res) => {
    res.json('pong')
})

let server

export const start = () => {
    return new Promise((resolve, reject) => {
        server = app.listen(3000, () => {
            resolve(server.address().port)
        })
        server.on('error', (err) => {
            reject(err)
        })
    })
}

export const stop = () => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}