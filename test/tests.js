import assert from 'assert'
import axios from 'axios'

import { start, stop } from '../src/server.js'


describe('servidor de pruebas', () => {

    let serverUrl

    before(async () => {
        const port = await start()
        serverUrl = `http://localhost:${port}`
    })
    after(async () => {
        await stop()
    })
    describe('el servidor esta escuchando', () => {
        describe('al hacer ping', () => {
            it('devuelve pong', async () => {
                const { data } = await axios.get(`${serverUrl}/ping`)
                assert.strictEqual('pong', data)
            })
        })
    })
})