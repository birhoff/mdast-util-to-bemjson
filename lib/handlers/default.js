'use strict';

const parseBlock = require('../build-node').parse;

const defaultTagsHash = {
    listItem: 'li',
    paragraph: 'p'
};

function unsupported(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = {};
    if (options.tag) {
        block.tag = defaultTagsHash[node.type] || block.block;
    }

    return transform(node, block, props, node.value);
}

module.exports = unsupported;
