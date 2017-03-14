'use strict';

const parseBlock = require('../build-node').parseBlock;

function unsupported(transform, node) {
    const options = transform.options;
    let block = parseBlock(node.type);
    let value = node.value;

    if (options.scope && options.root) {
        block = parseBlock(options.root);
        block.elem = node.type;
    }

    return transform(node, block, null, value);
}

module.exports = unsupported;
