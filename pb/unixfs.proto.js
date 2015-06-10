module.exports = require("protobufjs").newBuilder({})['import']({
    "package": "unixfs.pb",
    "messages": [
        {
            "name": "Data",
            "fields": [
                {
                    "rule": "required",
                    "type": "DataType",
                    "name": "Type",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Data",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint64",
                    "name": "filesize",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "uint64",
                    "name": "blocksizes",
                    "id": 4
                }
            ],
            "enums": [
                {
                    "name": "DataType",
                    "values": [
                        {
                            "name": "Raw",
                            "id": 0
                        },
                        {
                            "name": "Directory",
                            "id": 1
                        },
                        {
                            "name": "File",
                            "id": 2
                        },
                        {
                            "name": "Metadata",
                            "id": 3
                        }
                    ]
                }
            ]
        },
        {
            "name": "Metadata",
            "fields": [
                {
                    "rule": "required",
                    "type": "string",
                    "name": "MimeType",
                    "id": 1
                }
            ]
        }
    ]
}).build();