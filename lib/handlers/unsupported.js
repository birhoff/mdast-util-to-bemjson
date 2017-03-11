'use strict';

const has = require('has');

const traverse = require('../traverse');

const text = require('./text');

function unsupported(transform, node) {
    if (isText(node)) {
        return text(transform, node);
    }

    return transform(node, null, traverse.children(transform, node));
}

function isText(node) {
    const data = node.data || {};

    if (has(data, 'hName') || has(data, 'hProperties') || has(data, 'hChildren')) {
        return false;
    }

    return 'value' in node;
}

module.exports = unsupported;
