'use strict';

const parseBlock = require('../build-node').parse;

const defaultBlocksMap = {
    listItem: { tag: 'li' },
    paragraph: { tag: 'p' },
    emphasis: { tag: 'em' },
    inlineCode: { name: 'code', tag: 'code' },
    'delete': { name: 'del', tag: 'del' }
};

function unsupported(transform, node) {
    const options = transform.options;
    const defaultBlock = defaultBlocksMap[node.type] || {};
    const block = parseBlock(defaultBlock.name || node.type);

    const props = {};
    if (options.tag) {
        block.tag = defaultBlock.tag || block.block;
    }

    return transform(node, block, props, node.value);
}

module.exports = unsupported;
