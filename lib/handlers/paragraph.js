'use strict';

const parseBlock = require('../build-node').parse;

function paragraph(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = {};
    if (options.tag) {
        props.tag = 'p';
    }

    return transform(node, block, props, node.value);
}

module.exports = paragraph;
