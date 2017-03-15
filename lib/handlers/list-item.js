'use strict';

const parseBlock = require('../build-node').parse;

function listItem(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = {};
    if (options.tag) {
        props.tag = 'li';
    }

    return transform(node, block, props, node.value);
}

module.exports = listItem;
