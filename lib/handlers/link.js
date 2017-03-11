'use strict';

const normalize = require('normalize-uri');
const all = require('../all');

module.exports = link;

/* Transform a link. */
function link(h, node) {
    const props = { href: normalize(node.url) };

    if (node.title !== undefined) {
        props.title = node.title;
    }

    return h(node, 'a', props, all(h, node));
}
