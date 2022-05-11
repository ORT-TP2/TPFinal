import assert from 'assert'
import axios from 'axios'

import { start, stop } from '../src/server/server.js'
import { getParticipants, addParticipant } from '../src/participants/participants.js'
import { getGroups, addGroup } from '../src/groups/groups.js'


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
        describe('participants', () => {
            const validDataParticipants = [
                { data: { name: "Juan Sanchez", classOf: 2022 }, validData: 'with all fields' },
            ]
            const invalidDataParticipants = [
                { data: { classOf: 2022 }, invalidData: 'without a name' },
                { data: { name: "Juan Sanchez" }, invalidData: 'without a classOf' },
                { data: { name: "Juan Sanchez", classOf: "Dosmil Veintidos" }, invalidData: 'with a non numeric classOf' }
            ]
            describe('when getting', () => {
                describe('all', () => {
                    it('should return all', async () => {
                        const { data, status } = await axios.get(`${serverUrl}/participants`)

                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(data, getParticipants())
                    })
                })
                describe('one', () => {
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
                    validDataParticipants.forEach(validDataObject => {
                        describe(validDataObject.validData, () => {
                            it("should add it", async () => {
                                const participantsBefore = getParticipants()

                                const { data, status } = await axios.post(`${serverUrl}/participants`, validDataObject.data)

                                assert.strictEqual(status, 201)
                                assert.deepStrictEqual(participantsBefore.concat(data), getParticipants())
                            })
                        })
                    })
                })
                describe('with invalid data', () => {
                    invalidDataParticipants.forEach(invalidDataObject => {
                        describe(invalidDataObject.invalidData, () => {
                            it("should return 400 (Bad Request) and not add it", async () => {
                                const participantsBefore = getParticipants()

                                await assert.rejects(
                                    axios.post(`${serverUrl}/participants`, invalidDataObject.data),
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
            describe('when updating', () => {
                describe('that exists', () => {
                    describe('with valid data', () => {
                        validDataParticipants.forEach(validDataObject => {
                            describe(validDataObject.validData, () => {
                                it("should update it", async () => {
                                    const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                    const participantsBefore = getParticipants()
                                    const addedParticipant = addParticipant(newParticipant)

                                    const { data, status } = await axios.put(`${serverUrl}/participants/${addedParticipant.id}`, validDataObject.data)

                                    assert.strictEqual(status, 200)
                                    assert.deepStrictEqual(participantsBefore.concat(data), getParticipants())
                                })
                            })
                        })
                    })
                    describe('with invalid data', () => {
                        invalidDataParticipants.forEach(invalidDataObject => {
                            describe(invalidDataObject.invalidData, () => {
                                it("should return 400 (Bad Request) and not update", async () => {
                                    const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                    const addedParticipant = addParticipant(newParticipant)
                                    const participantsBefore = getParticipants()

                                    await assert.rejects(
                                        axios.put(`${serverUrl}/participants/${addedParticipant.id}`, invalidDataObject.data),
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
                describe("that doesn't exist", () => {
                    it("should return 404 (Not found) and not update", async () => {
                        const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                        addParticipant(newParticipant)
                        const id = "ThisIdDoesn'tExist"
                        const newUpdatedParticipant = { name: "Pepe Rodriguez", classOf: 2023 }
                        const participantsBefore = getParticipants()

                        await assert.rejects(
                            axios.put(`${serverUrl}/participants/${id}`, newUpdatedParticipant),
                            error => {
                                assert.strictEqual(error.response.status, 404)
                                return true
                            }
                        )
                        assert.deepStrictEqual(participantsBefore, getParticipants())
                    })
                })

            })
            describe('when deleting', () => {
                describe('that exists', () => {
                    it('should delete it', async () => {
                        const participantsBefore = getParticipants()
                        const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                        const addedParticipant = addParticipant(newParticipant)

                        const { data, status } = await axios.delete(`${serverUrl}/participants/${addedParticipant.id}`)


                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(participantsBefore, getParticipants())
                    })
                })
                describe("that doesn't exist", () => {
                    it('should return 404 (Not found)', async () => {
                        const id = "ThisIdDoesn'tExist"

                        await assert.rejects(
                            axios.delete(`${serverUrl}/participants/${id}`),
                            error => {
                                assert.strictEqual(error.response.status, 404)
                                return true
                            }
                        )
                    })
                })
            })
        })
        describe('groups', () => {
            const validDataGroups = [
                { data: { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }, validData: 'with all fields' },
                //{ data: { name: "Magos", ordinal: 1, area: "Jardín"}, validData: 'without an average quantity' },
            ]
            const invalidDataGroups = [
                { data: { ordinal: 1, area: "Jardín", avgQty: 15 }, invalidData: 'without a name' },
                { data: { name: "Magos", area: "Jardín", avgQty: 15 }, invalidData: 'without an ordinal' },
                { data: { name: "Magos", ordinal: "Dos", area: "Jardín", avgQty: 15 }, invalidData: 'with a non numeric ordinal' },
                { data: { name: "Magos", ordinal: 1, avgQty: 15 }, invalidData: 'without an area' },
            ]
            describe('when getting', () => {
                describe('all', () => {
                    it('should return all', async () => {
                        const { data, status } = await axios.get(`${serverUrl}/groups`)

                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(data, getGroups())
                    })
                })
                describe('one', () => {
                    describe('that exists', () => {
                        it('should return that one', async () => {
                            const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                            const addedGroup = addGroup(newGroup)

                            const { data, status } = await axios.get(`${serverUrl}/groups/${addedGroup.id}`)

                            assert.strictEqual(status, 200)
                            assert.deepStrictEqual(data, addedGroup)
                        })
                    })
                    describe("that doesn't exist", () => {
                        it('should return 404 (Not found)', async () => {
                            const id = "ThisIdDoesn'tExist"

                            await assert.rejects(
                                axios.get(`${serverUrl}/groups/${id}`),
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
                    validDataGroups.forEach(validDataObject => {
                        describe(validDataObject.validData, () => {
                            it("should add it", async () => {
                                const groupsBefore = getGroups()

                                const { data, status } = await axios.post(`${serverUrl}/groups`, validDataObject.data)

                                assert.strictEqual(status, 201)
                                assert.deepStrictEqual(groupsBefore.concat(data), getGroups())
                            })
                        })
                    })
                })
                describe('with invalid data', () => {
                    invalidDataGroups.forEach(invalidDataObject => {
                        describe(invalidDataObject.invalidData, () => {
                            it("should return 400 (Bad Request) and not add it", async () => {
                                const groupsBefore = getGroups()

                                await assert.rejects(
                                    axios.post(`${serverUrl}/groups`, invalidDataObject.data),
                                    error => {
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                assert.deepStrictEqual(groupsBefore, getGroups())
                            })
                        })
                    })
                })
            })
            describe('when updating', () => {
                describe('that exists', () => {
                    describe('with valid data', () => {
                        validDataGroups.forEach(validDataObject => {
                            describe(validDataObject.validData, () => {
                                it("should update it", async () => {
                                    const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                                    const groupsBefore = getGroups()
                                    const addedGroup = addGroup(newGroup)

                                    const { data, status } = await axios.put(`${serverUrl}/groups/${addedGroup.id}`, validDataObject.data)

                                    assert.strictEqual(status, 200)
                                    assert.deepStrictEqual(groupsBefore.concat(data), getGroups())
                                })
                            })
                        })
                    })
                    describe('with invalid data', () => {
                        invalidDataGroups.forEach(invalidDataObject => {
                            describe(invalidDataObject.invalidData, () => {
                                it("should return 400 (Bad Request) and not update", async () => {
                                    const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                                    const addedGroup = addGroup(newGroup)
                                    const groupsBefore = getGroups()

                                    await assert.rejects(
                                        axios.put(`${serverUrl}/groups/${addedGroup.id}`, invalidDataObject.data),
                                        error => {
                                            assert.strictEqual(error.response.status, 400)
                                            return true
                                        }
                                    )
                                    assert.deepStrictEqual(groupsBefore, getGroups())
                                })
                            })
                        })
                    })
                })
                describe("that doesn't exist", () => {
                    it("should return 404 (Not found) and not update", async () => {
                        const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                        addGroup(newGroup)
                        const id = "ThisIdDoesn'tExist"
                        const newUpdatedGroup = { name: "Reyes", ordinal: 4, area: "Primaria Chica", avgQty: 12 }
                        const groupsBefore = getGroups()

                        await assert.rejects(
                            axios.put(`${serverUrl}/groups/${id}`, newUpdatedGroup),
                            error => {
                                assert.strictEqual(error.response.status, 404)
                                return true
                            }
                        )
                        assert.deepStrictEqual(groupsBefore, getGroups())
                    })
                })

            })
            describe('when deleting', () => {
                describe('that exists', () => {
                    it('should delete it', async () => {
                        const groupsBefore = getGroups()
                        const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                        const addedGroup = addGroup(newGroup)

                        const { data, status } = await axios.delete(`${serverUrl}/groups/${addedGroup.id}`)


                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(groupsBefore, getGroups())
                    })
                })
                describe("that doesn't exist", () => {
                    it('should return 404 (Not found)', async () => {
                        const id = "ThisIdDoesn'tExist"

                        await assert.rejects(
                            axios.delete(`${serverUrl}/groups/${id}`),
                            error => {
                                assert.strictEqual(error.response.status, 404)
                                return true
                            }
                        )
                    })
                })
            })
        })
    })
})