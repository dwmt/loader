const chai = require('chai')
const sinon = require('sinon')
const generateUUID = require('../lib/UUIDGenerator')

const expect = chai.expect

describe('UUIDGenerator tests', () => {
	it ('should generate a 36 character string', () => {
		let id = generateUUID()
		expect(id.length).to.be.equal(36)
	})
	it ('should generate different ids when called', () => {
		let set = new Set()
		for (let i = 0; i < 16; i++) {
			set.add(generateUUID())
		}
		let differentIds = [...set]
		expect(differentIds.length).to.be.equal(16)
	})
})
