import { Record, Set } from 'immutable'

var _DagLink = Record({ name: null, hash: null, linkedNodeSize: 0 })
export class DagLink extends _DagLink {
  asJSONforAPI() {
    return {
      Name: this.name,
      Hash: this.hash,
      Size: this.linkedNodeSize,
    }
  }
}

var _DagObject = Record({ links: new Set(), data: null })
export class DagObject extends _DagObject {
  asJSONforAPI() {
    return {
      Links: this.links.map(l => l.asJSONforAPI()).toJS(),
      Data: this.data,
    }
  }

  addLink(name, hash, size) {
    var link = new DagLink({ name, hash, linkedNodeSize: size })
    return this.set('links', this.links.add(link))
  }
}

export default DagLink
