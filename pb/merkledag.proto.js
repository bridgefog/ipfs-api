module.exports = require("protobufjs").newBuilder({})['import']({
    "package": "merkledag.pb",
    "messages": [
        {
            "name": "PBLink",
            "fields": [
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Hash",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Name",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint64",
                    "name": "Tsize",
                    "id": 3
                }
            ]
        },
        {
            "name": "PBNode",
            "fields": [
                {
                    "rule": "repeated",
                    "type": "PBLink",
                    "name": "Links",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Data",
                    "id": 1
                }
            ]
        }
    ]
}).build();