'use strict';

/**
 * Build simple block bemjson
 *
 * @param {String|Object} entity - bem entity (block name, or block object itself)
 * @param {Object} props - block properties
 * @param {String|Object|Array} content - block content
 * @return {Object}
 */
function buildNode(entity, props, content) {
    const block = buildBlock(entity);
    const hasContent = _hasContent(content);

    return Object.assign({}, props, block, hasContent ? { content } : {});
}

function buildBlock(block) {
    if (typeof block === 'object') return block;

    return { block };
}

function _hasContent(content) {
    if ((typeof content === 'string' || Array.isArray(content)) && content.length === 0) return false;
    return !(content === undefined || content === null);
}

module.exports = buildNode;
