const chai = require('chai')
const generateUUID = require('../lib/UUIDGenerator')

const expect = chai.expect

describe('UUIDGenerator tests', () => {
  it('should generate a 36 character string', () => {
    const id = generateUUID()
    expect(id.length).to.be.equal(36)
  })
  it('should generate different ids when called', () => {
    const set = new Set()
    for (let i = 0; i < 16; i++) {
      set.add(generateUUID())
    }
    const differentIds = [...set]
    expect(differentIds.length).to.be.equal(16)
  })
})
