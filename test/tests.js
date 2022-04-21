import assert from 'assert'
import axios from 'axios'

import { start, stop } from '../src/server.js'


describe('servidor de pruebas', () => {
    before(async () => {
        await start()
    })
    after(async () => {
        await stop()
    })
    describe('el servidor esta escuchando', () => {
        describe('al hacer ping', () => {
            it('devuelve pong', async () => {
                const { data } = await axios.get('http://localhost:3000/ping')
                assert.strictEqual('pong', data)
            })
        })
    })
})