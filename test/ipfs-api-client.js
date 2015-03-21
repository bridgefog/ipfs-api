'use strict'

var assert = require('assert')
var vows = require('vows')
var immutable = require('immutable')
var ipfs = require('../lib/ipfs-api-client')('localhost', 9999)

var knownHashes = {
  foo: 'QmWqEeZS1HELySbm8t8U55UkBe75kaLj9WnFb882Tkf5NL'
}

vows.describe('IPFS API').addBatch({
  addObject: {
    topic: function () {
      var dagNode = new ipfs.DagNode({data: 'foo'})
      ipfs.addObject(dagNode, this.callback)
    },
    'returns a thing with the correct Hash': function (result) {
      assert.deepEqual(result, {
        Hash: knownHashes.foo,
        Links: []
      })
    }
  },

  'nameResolveSelf / namePublish': {
    topic: function () {
      ipfs.namePublish(knownHashes.foo, this.callback)
    },
    'returns nothing after publishing': {
      topic: function () {
        ipfs.nameResolveSelf(this.callback)
      },
      'returns the currently published key': function (result) {
        assert.deepEqual(result, knownHashes.foo)
      }
    }
  },

  DagNode: {
    constructor: {
      'with no arguments': {
        topic: function () {
          return new ipfs.DagNode()
        },
        'it is empty': function (node) {
          assert.equal(node.data, null)
          assert.equal(node.links.size, 0)
        }
      },

      'with just links': {
        topic: function () {
          return new ipfs.DagNode({links: immutable.Set([1, 2, 3])})
        },
        'it has links but no data': function (node) {
          assert.equal(node.data, null)
          assert.equal(node.links.size, 3)
          assert.deepEqual(node.links.toJS(), [1, 2, 3])
        }
      },

      'with just data': {
        topic: function () {
          return new ipfs.DagNode({data: 'foobarbaz'})
        },
        'it has data but no links': function (node) {
          assert.equal(node.data, 'foobarbaz')
        }
      },
    },

    addLink: {
      topic: function () {
        return new ipfs.DagNode()
      },
      'it returns the node, for chaining': function (node) {
        assert.instanceOf(node.addLink('fakelink1', 'fakehash1'), ipfs.DagNode)
      },
      'it adds a link to the object with the given name and hash': function (node) {
        assert.equal(node.links.size, 0)
        node = node.addLink('name2', 'hash2')
        assert.equal(node.links.size, 1)
        assert.deepEqual(node.links.toJS(), [{
          name: 'name2',
          hash: 'hash2'
        }])
      }
    },

    asJSONforAPI: (function () {
      var data = 'foobarbaz'
      return {
        topic: function () {
          return new ipfs.DagNode({data: data}).asJSONforAPI()
        },
        'returns buffer': function (buffer) {
          assert(buffer instanceof Buffer)
        },
        'is encoded as JSON': function (buffer) {
          assert(JSON.parse(buffer.toString()))
        },
        '"Data" is encoded as base64': function (buffer) {
          var expectedData = new Buffer(data).toString('base64')
          var actualData = JSON.parse(buffer.toString()).Data
          assert.equal(actualData, expectedData)
        }
      }
    })()
  }
}).export(module)
