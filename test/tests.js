import assert from 'assert'
import axios from 'axios'

import { start, stop } from '../src/server/server.js'
import { getParticipants, addParticipant } from '../src/participants/participants.js'


describe('test server', () => {

    let serverUrl

    before(async () => {
        const port = await start()
        serverUrl = `http://localhost:${port}`
    })
    after(async () => {
        await stop()
    })
    describe('server is listening', () => {
        describe('when pinged', () => {
            it('pongs', async () => {
                const { data } = await axios.get(`${serverUrl}/ping`)
                
                assert.strictEqual(data, 'pong')
            })
        })
        describe('participants', () => {
            describe('when asking', () => {
                describe('for all', () => {
                    it('should return all', async () => {
                        const { data, status } = await axios.get(`${serverUrl}/participants`)

                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(data, getParticipants())
                    })
                })
                describe('for one', () => {
                    describe('that exists', () => {
                        it('should return that one', async () => {
                            const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                            const addedParticipant = addParticipant(newParticipant)
                            
                            const { data, status } = await axios.get(`${serverUrl}/participants/${addedParticipant.id}`)

                            assert.strictEqual(status, 200)
                            assert.deepStrictEqual(data, addedParticipant)
                        })
                    })
                    describe("that doesn't exist", () => {
                        it('should return 404 (Not found)', async () => {
                            const id = "ThisIdDoesn'tExist"
                            await assert.rejects(
                                axios.get(`${serverUrl}/participants/${id}`),
                                error => {
                                    assert.strictEqual(error.response.status, 404)
                                    return true
                                }
                            )
                        })
                    })
                })
            })
            describe('when adding', () => {
                describe('with valid data', () => {
                    it("should add it", async () => {
                        const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                        const participantsBefore = getParticipants()

                        const { data, status } = await axios.post(`${serverUrl}/participants`, newParticipant)

                        assert.strictEqual(status, 201)
                        assert.deepStrictEqual(participantsBefore.concat(data), getParticipants())
                    })
                })
                describe('without a name', () => {
                    it("should return 400 (Bad Request) and not add it", async () => {
                        const newParticipant = { classOf: 2022 }
                        const participantsBefore = getParticipants()

                        await assert.rejects(
                            axios.post(`${serverUrl}/participants`, newParticipant),
                            error => {
                                assert.strictEqual(error.response.status, 400)
                                return true
                            }
                        )

                        assert.deepStrictEqual(participantsBefore, getParticipants())
                    })
                })
                describe('without a classOf', () => {
                    it("should return 400 (Bad Request) and not add it", async () => {
                        const newParticipant = { name: "Juan Sanchez" }
                        const participantsBefore = getParticipants()

                        await assert.rejects(
                            axios.post(`${serverUrl}/participants`, newParticipant),
                            error => {
                                assert.strictEqual(error.response.status, 400)
                                return true
                            }
                        )

                        assert.deepStrictEqual(participantsBefore, getParticipants())
                    })
                })
                describe('with a non numeric classOf', () => {
                    it("should return 400 (Bad Request) and not add it", async () => {
                        const newParticipant = { name: "Juan Sanchez", classOf: "Dosmil Veintidos" }
                        const participantsBefore = getParticipants()

                        await assert.rejects(
                            axios.post(`${serverUrl}/participants`, newParticipant),
                            error => {
                                assert.strictEqual(error.response.status, 400)
                                return true
                            }
                        )

                        assert.deepStrictEqual(participantsBefore, getParticipants())
                    })
                })
            })
        })
    })
})