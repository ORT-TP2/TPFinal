import assert from 'assert'
import axios from 'axios'

import { start, stop } from '../src/server/server.js'
import * as participantService from '../src/participant/service/participantService.js'
import * as groupService from '../src/group/service/groupService.js'


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
                { data: { name: "Juan Sanchez", classOf: 2022 }, description: 'with all fields' },
            ]
            const invalidDataParticipants = [
                { data: { classOf: 2022 }, description: 'without a name' },
                { data: { name: "Juan Sanchez" }, description: 'without a classOf' },
                { data: { name: "Juan Sanchez", classOf: "Dosmil Veintidos" }, description: 'with a non numeric classOf' }
            ]
            describe('when getting', () => {
                describe('all', () => {
                    it('should return all', async () => {
                        //Act
                        const { data, status } = await axios.get(`${serverUrl}/participants`)

                        //Assert
                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(data, participantService.getParticipants())
                    })
                })
                describe('one', () => {
                    describe('that exists', () => {
                        it('should return that one', async () => {
                            //Arrange
                            const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                            const addedParticipant = participantService.addParticipant(newParticipant)

                            //Act
                            const { data, status } = await axios.get(`${serverUrl}/participants/${addedParticipant.id}`)

                            //Assert
                            assert.strictEqual(status, 200)
                            assert.deepStrictEqual(data, addedParticipant)
                        })
                    })
                    describe("that doesn't exist", () => {
                        it('should return 404 (Not found)', async () => {
                            //Arrange
                            const id = "ThisIdDoesn'tExist"

                            //Act & Assert
                            await assert.rejects(
                                axios.get(`${serverUrl}/participants/${id}`),
                                error => {
                                    //Assert
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
                        describe(validDataObject.description, () => {
                            it("should add it", async () => {
                                //Arrange
                                const participantsBefore = participantService.getParticipants()

                                //Act
                                const { data, status } = await axios.post(`${serverUrl}/participants`, validDataObject.data)

                                //Assert
                                assert.strictEqual(status, 201)
                                assert.deepStrictEqual(participantsBefore.concat(data), participantService.getParticipants())
                            })
                        })
                    })
                })
                describe('with invalid data', () => {
                    invalidDataParticipants.forEach(invalidDataObject => {
                        describe(invalidDataObject.description, () => {
                            it("should return 400 (Bad Request) and not add it", async () => {
                                //Arrange
                                const participantsBefore = participantService.getParticipants()

                                //Act & Assert
                                await assert.rejects(
                                    axios.post(`${serverUrl}/participants`, invalidDataObject.data),
                                    error => {
                                        //Assert
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )

                                //Assert
                                assert.deepStrictEqual(participantsBefore, participantService.getParticipants())
                            })
                        })
                    })
                })
            })
            describe('when updating', () => {
                describe('that exists', () => {
                    describe('with valid data', () => {
                        validDataParticipants.forEach(validDataObject => {
                            describe(validDataObject.description, () => {
                                it("should update it", async () => {
                                    //Arrange
                                    const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                    const participantsBefore = participantService.getParticipants()
                                    const addedParticipant = participantService.addParticipant(newParticipant)

                                    //Act
                                    const { data, status } = await axios.put(`${serverUrl}/participants/${addedParticipant.id}`, validDataObject.data)

                                    //Assert
                                    assert.strictEqual(status, 200)
                                    assert.deepStrictEqual(participantsBefore.concat(data), participantService.getParticipants())
                                })
                            })
                        })
                    })
                    describe('with invalid data', () => {
                        invalidDataParticipants.forEach(invalidDataObject => {
                            describe(invalidDataObject.description, () => {
                                it("should return 400 (Bad Request) and not update", async () => {
                                    //Arrange
                                    const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                                    const addedParticipant = participantService.addParticipant(newParticipant)
                                    const participantsBefore = participantService.getParticipants()

                                    //Act & Assert
                                    await assert.rejects(
                                        axios.put(`${serverUrl}/participants/${addedParticipant.id}`, invalidDataObject.data),
                                        error => {
                                            //Assert
                                            assert.strictEqual(error.response.status, 400)
                                            return true
                                        }
                                    )
                                    //Assert
                                    assert.deepStrictEqual(participantsBefore, participantService.getParticipants())
                                })
                            })
                        })
                    })
                })
                describe("that doesn't exist", () => {
                    it("should return 404 (Not found) and not update", async () => {
                        //Arrange
                        const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                        participantService.addParticipant(newParticipant)
                        const id = "ThisIdDoesn'tExist"
                        const newUpdatedParticipant = { name: "Pepe Rodriguez", classOf: 2023 }
                        const participantsBefore = participantService.getParticipants()

                        //Act & Assert
                        await assert.rejects(
                            axios.put(`${serverUrl}/participants/${id}`, newUpdatedParticipant),
                            error => {
                                //Assert
                                assert.strictEqual(error.response.status, 404)
                                return true
                            }
                        )
                        //Assert
                        assert.deepStrictEqual(participantsBefore, participantService.getParticipants())
                    })
                })

            })
            describe('when deleting', () => {
                describe('that exists', () => {
                    it('should delete it', async () => {
                        //Arrange
                        const participantsBefore = participantService.getParticipants()
                        const newParticipant = { name: "Juan Sanchez", classOf: 2022 }
                        const addedParticipant = participantService.addParticipant(newParticipant)

                        //Act
                        const { data, status } = await axios.delete(`${serverUrl}/participants/${addedParticipant.id}`)

                        //Assert
                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(participantsBefore, participantService.getParticipants())
                    })
                })
                describe("that doesn't exist", () => {
                    it('should return 404 (Not found)', async () => {
                        //Arrange
                        const id = "ThisIdDoesn'tExist"

                        //Act & Assert
                        await assert.rejects(
                            axios.delete(`${serverUrl}/participants/${id}`),
                            error => {
                                //Assert
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
                { data: { name: "Magos", ordinal: 1, area: "Jard??n", avgQty: 15 }, description: 'with all fields' },
                //{ data: { name: "Magos", ordinal: 1, area: "Jard??n"}, description: 'without an average quantity' },
            ]
            const invalidDataGroups = [
                { data: { ordinal: 1, area: "Jard??n", avgQty: 15 }, description: 'without a name' },
                { data: { name: "Magos", area: "Jard??n", avgQty: 15 }, description: 'without an ordinal' },
                { data: { name: "Magos", ordinal: "Dos", area: "Jard??n", avgQty: 15 }, description: 'with a non numeric ordinal' },
                { data: { name: "Magos", ordinal: 1, avgQty: 15 }, description: 'without an area' },
            ]
            describe('when getting', () => {
                describe('all', () => {
                    it('should return all', async () => {
                        //Act
                        const { data, status } = await axios.get(`${serverUrl}/groups`)

                        //Assert
                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(data, groupService.getGroups())
                    })
                })
                describe('one', () => {
                    describe('that exists', () => {
                        it('should return that one', async () => {
                            //Arrange
                            const newGroup = { name: "Magos", ordinal: 1, area: "Jard??n", avgQty: 15 }
                            const addedGroup = groupService.addGroup(newGroup)

                            //Act
                            const { data, status } = await axios.get(`${serverUrl}/groups/${addedGroup.id}`)
                            
                            //Assert
                            assert.strictEqual(status, 200)
                            assert.deepStrictEqual(data, addedGroup)
                        })
                    })
                    describe("that doesn't exist", () => {
                        it('should return 404 (Not found)', async () => {
                            //Arrange
                            const id = "ThisIdDoesn'tExist"

                            //Act & Assert
                            await assert.rejects(
                                axios.get(`${serverUrl}/groups/${id}`),
                                error => {
                                    //Assert
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
                        describe(validDataObject.description, () => {
                            it("should add it", async () => {
                                //Arrange
                                const groupsBefore = groupService.getGroups()

                                //Act
                                const { data, status } = await axios.post(`${serverUrl}/groups`, validDataObject.data)

                                //Assert
                                assert.strictEqual(status, 201)
                                assert.deepStrictEqual(groupsBefore.concat(data), groupService.getGroups())
                            })
                        })
                    })
                })
                describe('with invalid data', () => {
                    invalidDataGroups.forEach(invalidDataObject => {
                        describe(invalidDataObject.description, () => {
                            it("should return 400 (Bad Request) and not add it", async () => {
                                //Arrange
                                const groupsBefore = groupService.getGroups()

                                //Act & Assert
                                await assert.rejects(
                                    axios.post(`${serverUrl}/groups`, invalidDataObject.data),
                                    error => {
                                        //Assert
                                        assert.strictEqual(error.response.status, 400)
                                        return true
                                    }
                                )
                                //Assert
                                assert.deepStrictEqual(groupsBefore, groupService.getGroups())
                            })
                        })
                    })
                })
            })
            describe('when updating', () => {
                describe('that exists', () => {
                    describe('with valid data', () => {
                        validDataGroups.forEach(validDataObject => {
                            describe(validDataObject.description, () => {
                                it("should update it", async () => {
                                    //Arrange
                                    const newGroup = { name: "Magos", ordinal: 1, area: "Jard??n", avgQty: 15 }
                                    const groupsBefore = groupService.getGroups()
                                    const addedGroup = groupService.addGroup(newGroup)

                                    //Act
                                    const { data, status } = await axios.put(`${serverUrl}/groups/${addedGroup.id}`, validDataObject.data)

                                    //Assert
                                    assert.strictEqual(status, 200)
                                    assert.deepStrictEqual(groupsBefore.concat(data), groupService.getGroups())
                                })
                            })
                        })
                    })
                    describe('with invalid data', () => {
                        invalidDataGroups.forEach(invalidDataObject => {
                            describe(invalidDataObject.description, () => {
                                it("should return 400 (Bad Request) and not update", async () => {
                                    //Arrange
                                    const newGroup = { name: "Magos", ordinal: 1, area: "Jard??n", avgQty: 15 }
                                    const addedGroup = groupService.addGroup(newGroup)
                                    const groupsBefore = groupService.getGroups()

                                    //Act & Assert
                                    await assert.rejects(
                                        axios.put(`${serverUrl}/groups/${addedGroup.id}`, invalidDataObject.data),
                                        error => {
                                            //Assert
                                            assert.strictEqual(error.response.status, 400)
                                            return true
                                        }
                                    )
                                    //Assert
                                    assert.deepStrictEqual(groupsBefore, groupService.getGroups())
                                })
                            })
                        })
                    })
                })
                describe("that doesn't exist", () => {
                    it("should return 404 (Not found) and not update", async () => {
                        //Arrange
                        const newGroup = { name: "Magos", ordinal: 1, area: "Jard??n", avgQty: 15 }
                        groupService.addGroup(newGroup)
                        const id = "ThisIdDoesn'tExist"
                        const newUpdatedGroup = { name: "Reyes", ordinal: 4, area: "Primaria Chica", avgQty: 12 }
                        const groupsBefore = groupService.getGroups()

                        //Act & Assert
                        await assert.rejects(
                            axios.put(`${serverUrl}/groups/${id}`, newUpdatedGroup),
                            error => {
                                //Assert
                                assert.strictEqual(error.response.status, 404)
                                return true
                            }
                        )
                        //Assert
                        assert.deepStrictEqual(groupsBefore, groupService.getGroups())
                    })
                })

            })
            describe('when deleting', () => {
                describe('that exists', () => {
                    it('should delete it', async () => {
                        //Arrange
                        const groupsBefore = groupService.getGroups()
                        const newGroup = { name: "Magos", ordinal: 1, area: "Jard??n", avgQty: 15 }
                        const addedGroup = groupService.addGroup(newGroup)

                        //Act
                        const { status } = await axios.delete(`${serverUrl}/groups/${addedGroup.id}`)

                        //Assert
                        assert.strictEqual(status, 200)
                        assert.deepStrictEqual(groupsBefore, groupService.getGroups())
                    })
                })
                describe("that doesn't exist", () => {
                    it('should return 404 (Not found)', async () => {
                        //Arrange
                        const id = "ThisIdDoesn'tExist"

                        //Act & Assert
                        await assert.rejects(
                            axios.delete(`${serverUrl}/groups/${id}`),
                            error => {
                                //Assert
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