'use strict';

module.exports = failsafe;

const u = require('unist-builder');
const all = require('./all');

/* Return the content of a reference without definition
 * as markdown. */
function failsafe(h, node, definition) {
    const subtype = node.referenceType;

    if (subtype !== 'collapsed' && subtype !== 'full' && !definition) {
        if (node.type === 'imageReference') {
            return u('text', '![' + node.alt + ']');
        }

        return [u('text', '[')].concat(all(h, node), u('text', ']'));
    }
}
