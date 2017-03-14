'use strict';

const parseBlock = require('../build-node').parse;

function list(transform, node) {
    const options = transform.options;
    const type = node.ordered ? 'ol' : 'ul';
    const block = parseBlock(node.type);

    block.mods = { type };

    const props = {};
    if (options.tag) {
        props.tag = type;
    }

    if (typeof node.start === 'number' && node.start !== 1) {
        props.start = node.start;
    }

    return transform(node, block, props, node.value);
}

module.exports = list;
