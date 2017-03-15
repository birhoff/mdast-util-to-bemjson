'use strict';

const normalize = require('normalize-uri');

const parseBlock = require('../build-node').parse;

function image(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = { url: normalize(node.url) };
    node.title && (props.title = node.title);
    node.alt && (props.alt = node.alt);

    if (options.tag) {
        props.tag = 'img';
        props.attrs = { src: props.url };
        node.alt && (props.attrs.alt = node.alt);
    }

    return transform(node, block, props, node.value);
}

module.exports = image;
