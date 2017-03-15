'use strict';

const parseBlock = require('../build-node').parse;

function hardBreak(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = {};
    if (options.tag) {
        props.tag = 'br';
        props.bem = false;
    }

    return transform(node, block, props, node.value);
}

module.exports = hardBreak;
