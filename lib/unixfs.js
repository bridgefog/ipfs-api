import R from 'ramda'
import { DagObject } from './dag-object'
import unixfsPb from '../pb/unixfs.proto'

var Data = unixfsPb.unixfs.pb.Data

const directoryNodeData = new Data({ Type: Data.DataType.Directory }).encode().toBuffer().toString()

export class DirectoryNode extends DagObject {
  constructor(props) {
    super(R.assoc('data', directoryNodeData, props))
  }
}

export class FileNode extends DagObject {
  constructor(props={}) {
    var data = new Data({ Type: Data.DataType.File, Data: props.data }).encode().toBuffer().toString()
    super(R.assoc('data', data, props))
  }
}
