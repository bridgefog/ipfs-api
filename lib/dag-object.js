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

export class DagObject {
  constructor({ data }={}) {
    this.links = new Set()
    this.data = data
  }

  asJSONforAPI() {
    return {
      Links: this.links.toJS().map(l => l.asJSONforAPI()),
      Data: this.data ? this.data : '\u0008\u0001',
    }
  }

  addLink(name, hash, size) {
    var link = new DagLink(name, hash, size)
    this.links = this.links.add(link)
    return this
  }

  linkNamed(name) {
    return this.links.find(link => link.name == name)
  }
}

export default DagObject
