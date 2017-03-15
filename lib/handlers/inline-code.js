'use strict';

const parseBlock = require('../build-node').parse;

function heading(transform, node) {
    const options = transform.options;
    const block = parseBlock('code');

    const props = {};
    if (options.tag) {
        props.tag = 'code';
    }

    return transform(node, block, props, node.value);
}

module.exports = heading;
