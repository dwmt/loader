const chai = require('chai')

const expect = chai.expect

const LoaderContainer = require('../lib/LoaderContainer')

let loaderContainer = new LoaderContainer()

describe('Loader container tests', () => {
	it('should exist', () => {
		expect(loaderContainer).to.exist
	})
})
