'use strict';

const detab = require('detab');
const escapeHtml = require('escape-html');

const parseBlock = require('../build-node').parse;

function code(transform, node) {
    const opts = transform.options;
    const lang = node.lang;
    let value = node.value ? detab(node.value + '\n') : '';
    let escaped = false;

    if (opts.markdown && opts.markdown.highlight) {
        const highlighted = require('highlight.js').highlight(lang, value).value;

        if (highlighted !== null && highlighted !== value) {
            escaped = true;
            value = highlighted;
        }
    }

    const result = {
        block: 'blockcode',
        content: {
            elem: 'code',
            content: escaped ? value : escapeHtml(value)
        }
    };

    if (opts.tag) {
        result.tag = 'pre';
        result.content.tag = 'code';
    }

    if (lang) {
        result.mods = { lang };
    }

    return transform(node, parseBlock(result, opts));
}

module.exports = code;
