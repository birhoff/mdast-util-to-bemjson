'use strict';

module.exports = imageReference;

const normalize = require('normalize-uri');
const failsafe = require('../failsafe');

/* Transform a reference to an image. */
function imageReference(h, node) {
    const def = h.definition(node.identifier);
    const props = { src: normalize((def && def.url) || ''), alt: node.alt };

    if (def && def.title !== undefined) {
        props.title = def.title;
    }

    return failsafe(h, node, def) || h(node, 'img', props);
}
