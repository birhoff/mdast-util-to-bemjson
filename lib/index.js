'use strict';

const definitions = require('mdast-util-definitions');

const build = require('./build-node').build;
const wrap = require('./build-node').wrapWithScope;
const traverse = require('./traverse');
const handlers = require('./handlers');

/**
 * Create transform function that translate MDAST node to bemjson block
 *
 * @param {Object} tree - MDAST tree
 * @param {Object} [options] - transform options
 * @param {String} [options.root] - name of root block. Default: `documentation`.
 * @param {Boolean} [options.scope] - If true all nodes will be elements of root block.
 * @returns {Function} transform function
 */
function transformFactory(tree, options = {}) {

    transform.definition = definitions(tree, options);
    transform.handlers = Object.assign({}, handlers);
    transform.options = options;

    function transform(node, block, props, content) {
        const blockContent = (block && block.content) || content || traverse.children(transform, node);
        const wrappedBlock = wrap(block, options);

        return build(wrappedBlock, props, blockContent);
    }

    return transform;
}

/**
 * Transform `tree`, which is an MDAST node, to a Bemjson node.
 *
 * @param {Node} tree - MDAST tree
 * @param {Object} options - transform options
 * @return {Object}
 */
function toBemjson(tree, options) {
    const transform = transformFactory(tree, options);

    return traverse(transform, tree);
}

module.exports = toBemjson;
