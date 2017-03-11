'use strict';
const trimLines = require('trim-lines');

function text(transform, node) {
    return transform(node, 'text', trimLines(node.value));
}

module.exports = text;
