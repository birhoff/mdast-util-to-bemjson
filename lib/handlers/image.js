'use strict';

const normalize = require('normalize-uri');

module.exports = image;

/* Transform an image. */
function image(h, node) {
    const props = { src: normalize(node.url), alt: node.alt };

    if (node.title !== undefined) {
        props.title = node.title;
    }

    return h(node, 'img', props);
}
