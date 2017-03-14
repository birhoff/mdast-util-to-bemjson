'use strict';

const parseBlock = require('../build-node').parse;

function unsupported(transform, node) {
    const options = transform.options;

    return transform(node, parseBlock(node.type, options), null, node.value);
}

module.exports = unsupported;
