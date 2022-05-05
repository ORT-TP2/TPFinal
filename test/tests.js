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
                describe('whit invalid data', () => {
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
            describe('when updating', () => {
                describe('that exists', () => {
                    describe('with valid data', () => {
                        it("should update it", async () => {
                            const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                            const participantsBefore = getParticipants()
                            const addedParticipant = addParticipant(newParticipant)
                            const newUpdatedParticipant = { name: "Pepe Rodriguez", classOf: 2023 }

                            const { data, status } = await axios.put(`${serverUrl}/participants/${addedParticipant.id}`, newUpdatedParticipant)

                            assert.strictEqual(status, 200)
                            assert.deepStrictEqual(participantsBefore.concat(data), getParticipants())
                        })
                    })
                    describe('with invalid data', () => {
                        describe('without a name', () => {
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                const addedParticipant = addParticipant(newParticipant)
                                const newUpdatedParticipant = { classOf: 2023 }
                                const participantsBefore = getParticipants()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/participants/${addedParticipant.id}`, newUpdatedParticipant),
                                    error => {
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                assert.deepStrictEqual(participantsBefore, getParticipants())
                            })
                        })
                        describe('without a classOf', () => {
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                const addedParticipant = addParticipant(newParticipant)
                                const newUpdatedParticipant = { name: "Pepe Rodriguez" }
                                const participantsBefore = getParticipants()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/participants/${addedParticipant.id}`, newUpdatedParticipant),
                                    error => {
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                assert.deepStrictEqual(participantsBefore, getParticipants())
                            })
                        })
                        describe('with a non numeric classOf', () => {
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                const addedParticipant = addParticipant(newParticipant)
                                const newUpdatedParticipant = { name: "Pepe Rodriguez", classOf: "Dosmil Veintitres" }
                                const participantsBefore = getParticipants()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/participants/${addedParticipant.id}`, newUpdatedParticipant),
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
            describe('when asking', () => {
                describe('for all', () => {
                    it('should return all', async () => {
                        const { data, status } = await axios.get(`${serverUrl}/groups`)

                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(data, getGroups())
                    })
                })
                describe('for one', () => {
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
                    describe('with avgQty', () => {
                        it("should add it", async () => {
                            const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                            const groupsBefore = getGroups()

                            const { data, status } = await axios.post(`${serverUrl}/groups`, newGroup)

                            assert.strictEqual(status, 201)
                            assert.deepStrictEqual(groupsBefore.concat(data), getGroups())
                        })
                    })
                    /*TODO arreglar este test describe('without avgQty', () => {
                        it("should add it", async () => {
                            const newGroup = { name: "Magos", ordinal: 1, area: "Jardín" }
                            const groupsBefore = getGroups()

                            const { data, status } = await axios.post(`${serverUrl}/groups`, newGroup)

                            assert.strictEqual(status, 201)
                            assert.deepStrictEqual(groupsBefore.concat(data), getGroups())
                        })
                    })*/
                })
                describe('whit invalid data', () => {
                    describe('without a name', () => {
                        it("should return 400 (Bad Request) and not add it", async () => {
                            const newGroup = { ordinal: 1, area: "Jardín", avgQty: 15 }
                            const groupsBefore = getGroups()

                            await assert.rejects(
                                axios.post(`${serverUrl}/groups`, newGroup),
                                error => {
                                    assert.strictEqual(error.response.status, 400)
                                    return true
                                }
                            )
                            assert.deepStrictEqual(groupsBefore, getGroups())
                        })
                    })
                    describe('without an ordinal', () => {
                        it("should return 400 (Bad Request) and not add it", async () => {
                            const newGroup = { name: "Magos", area: "Jardín", avgQty: 15 }
                            const groupsBefore = getGroups()

                            await assert.rejects(
                                axios.post(`${serverUrl}/groups`, newGroup),
                                error => {
                                    assert.strictEqual(error.response.status, 400)
                                    return true
                                }
                            )
                            assert.deepStrictEqual(groupsBefore, getGroups())
                        })
                    })
                    describe('with a non numeric ordinal', () => {
                        it("should return 400 (Bad Request) and not add it", async () => {
                            const newGroup = { name: "Magos", ordinal: "Primero", area: "Jardín", avgQty: 15 }
                            const groupsBefore = getGroups()

                            await assert.rejects(
                                axios.post(`${serverUrl}/groups`, newGroup),
                                error => {
                                    assert.strictEqual(error.response.status, 400)
                                    return true
                                }
                            )
                            assert.deepStrictEqual(groupsBefore, getGroups())
                        })
                    })
                    describe('without an area', () => {
                        it("should return 400 (Bad Request) and not add it", async () => {
                            const newGroup = { name: "Magos", ordinal: 1, avgQty: 15 }
                            const groupsBefore = getGroups()

                            await assert.rejects(
                                axios.post(`${serverUrl}/groups`, newGroup),
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
            describe('when updating', () => {
                describe('that exists', () => {
                    describe('with valid data', () => {
                        it("should update it", async () => {
                            const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                            const groupsBefore = getGroups()
                            const addedGroup = addGroup(newGroup)
                            const newUpdatedGroup = { name: "Reyes", ordinal: 4, area: "Primaria Chica", avgQty: 12 }

                            const { data, status } = await axios.put(`${serverUrl}/groups/${addedGroup.id}`, newUpdatedGroup)

                            assert.strictEqual(status, 200)
                            assert.deepStrictEqual(groupsBefore.concat(data), getGroups())
                        })
                    })
                    describe('with invalid data', () => {
                        describe('without a name', () => {
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                                const addedGroup = addGroup(newGroup)
                                const newUpdatedGroup = { ordinal: 4, area: "Primaria Chica", avgQty: 12 }
                                const groupsBefore = getGroups()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/groups/${addedGroup.id}`, newUpdatedGroup),
                                    error => {
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                assert.deepStrictEqual(groupsBefore, getGroups())
                            })
                        })
                        describe('without an ordinal', () => {
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                                const addedGroup = addGroup(newGroup)
                                const newUpdatedGroup = { name: "Reyes", area: "Primaria Chica", avgQty: 12 }
                                const groupsBefore = getGroups()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/groups/${addedGroup.id}`, newUpdatedGroup),
                                    error => {
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                assert.deepStrictEqual(groupsBefore, getGroups())
                            })
                        })
                        describe('with a non numeric ordinal', () => {
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                                const addedGroup = addGroup(newGroup)
                                const newUpdatedGroup = { name: "Reyes", ordinal: "Cuarto", area: "Primaria Chica", avgQty: 12 }
                                const groupsBefore = getGroups()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/groups/${addedGroup.id}`, newUpdatedGroup),
                                    error => {
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                assert.deepStrictEqual(groupsBefore, getGroups())
                            })
                        })
                        describe('without an area', () =>{
                            it("should return 400 (Bad Request) and not update", async () => {
                                const newGroup = { name: "Magos", ordinal: 1, area: "Jardín", avgQty: 15 }
                                const addedGroup = addGroup(newGroup)
                                const newUpdatedGroup = { name: "Reyes", ordinal: 4, avgQty: 12 }
                                const groupsBefore = getGroups()

                                await assert.rejects(
                                    axios.put(`${serverUrl}/groups/${addedGroup.id}`, newUpdatedGroup),
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