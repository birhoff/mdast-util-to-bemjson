'use strict';

const parseBlock = require('../build-node').parse;

function html(transform, node) {
    const block = parseBlock(node.type, transform.options);

    delete block.tag;

    return transform(node, block, null, node.value);
}

module.exports = html;
