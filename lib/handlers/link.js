'use strict';

const normalize = require('normalize-uri');

const parseBlock = require('../build-node').parse;

function link(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = { href: normalize(node.url) };
    if (node.title) {
        props.title = node.title;
    }

    if (options.tag) {
        props.tag = 'a';
        props.attrs = { href: props.href };
    }

    return transform(node, block, props, node.value);
}

module.exports = link;
