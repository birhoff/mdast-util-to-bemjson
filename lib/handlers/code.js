'use strict';

module.exports = code;

const detab = require('detab');
const u = require('unist-builder');

/* Transform a code block. */
function code(h, node) {
    const value = node.value ? detab(node.value + '\n') : '';
    const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
    const props = {};

    if (lang) {
        props.className = ['language-' + lang];
    }

    return h(node.position, 'pre', [
        h(node, 'code', props, [u('text', value)])
    ]);
}
