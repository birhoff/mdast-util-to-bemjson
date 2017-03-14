'use strict';

/**
 * Build simple block bemjson
 *
 * @param {String|Object} entity - bem entity (block name, or block object itself)
 * @param {Object} props - block properties
 * @param {String|Object|Array} content - block content
 * @return {Object}
 */
module.exports.build = function buildNode(entity, props, content) {
    const block = _parseBlock(entity);
    const hasContent = _hasContent(content);

    return Object.assign({}, props, block, hasContent ? { content } : {});
};

/**
 * Parse different block representations into block json include scope
 *
 * @param {String|Object} entity - block name or block json
 * @param {Object} [options] - parse options
 * @param {Boolean} [options.scope] - render block or element
 * @returns {Object}
 */
module.exports.parse = function parse(entity, options) {
    let block = _parseBlock(entity);

    if (options.scope) {
        block.elem = block.block;

        if (block.mods) {
            block.elemMods = block.mods;
            delete block.mods;
        }

        delete block.block;
    }

    if (options.tag && !block.tag) {
        block.tag = block.block;
    }

    return block;
};

function _parseBlock(block) {
    if (typeof block === 'object') return block;

    return { block };
}

function _hasContent(content) {
    if ((typeof content === 'string' || Array.isArray(content)) && content.length === 0) return false;
    return !(content === undefined || content === null);
}
