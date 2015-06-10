import { assert } from 'chai'
// import { Set } from 'immutable'
import { DirectoryNode, FileNode } from '../../lib/unixfs'

describe('unixfs.DirectoryNode', () => {
  describe('asJSONforAPI()', () => {
    it('has correct protobuf bytes in Data field', () => {
      var subject = new DirectoryNode().asJSONforAPI()
      assert.equal(subject.Data, '\b\u0001')
    })
  })
})

describe('unixfs.FileNode', () => {
  describe('asJSONforAPI()', () => {
    it('has correct protobuf bytes in Data field', () => {
      var subject = new FileNode().asJSONforAPI()
      assert.equal(subject.Data, '\b\u0002')
    })
  })
})
