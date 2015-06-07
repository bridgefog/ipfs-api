import { Record, Set } from 'immutable'

export class DagLink {
  constructor(name, hash, size) {
    this.name = name || null
    this.hash = hash || null
    this.size = size || 0
  }

  asJSONforAPI() {
    return {
      Name: this.name,
      Hash: this.hash,
      Size: this.size,
    }
  }
}

export var DagObject = new Record({
  links: new Set(),
  data: null,
})

export default DagObject

DagObject.prototype.asJSONforAPI = function () {
  return {
    Links: this.links.toJS().map(l => l.asJSONforAPI()),
    Data: this.data ? this.data : '\u0008\u0001',
  }
}

DagObject.prototype.addLink = function (name, hash, size) {
  var link = new DagLink(name, hash, size)
  return this.set('links', this.links.add(link))
}
