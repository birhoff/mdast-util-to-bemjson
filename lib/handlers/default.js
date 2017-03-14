'use strict';

function unsupported(transform, node) {
    return transform(node, node.type, null, node.value);
}

module.exports = unsupported;
