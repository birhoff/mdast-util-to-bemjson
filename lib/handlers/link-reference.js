'use strict';

module.exports = linkReference;

const normalize = require('normalize-uri');
const failsafe = require('../failsafe');
const all = require('../all');

/* Transform a reference to a link. */
function linkReference(h, node) {
    const def = h.definition(node.identifier);
    const props = { href: normalize((def && def.url) || '') };

    if (def && def.title !== undefined) {
        props.title = def.title;
    }

    return failsafe(h, node, def) || h(node, 'a', props, all(h, node));
}
