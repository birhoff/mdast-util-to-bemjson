'use strict';

const parseBlock = require('../build-node').parseBlock;

function unsupported(transform, node) {
    const options = transform.options;
    let block = parseBlock(node.type);

    if (options.scope && options.root) {
        block = parseBlock(options.root);
        block.elem = node.type;
    }

    return transform(node, block, null, node.value);
}

module.exports = unsupported;
