import { generateUUID } from '../UUIDGenerator'

describe('UUIDGenerator tests', () => {
  it('should generate a 36 character string', () => {
    const id: string = generateUUID()
    expect(id.length).toEqual(36)
  })
  it('should generate different ids when called', () => {
    const set = new Set<string>()
    for (let i = 0; i < 16; i++) {
      set.add(generateUUID())
    }
    const differentIds: Array<string> = Array.from(set.values())
    expect(differentIds.length).toEqual(16)
  })
})
