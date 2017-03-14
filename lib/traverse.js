'use strict';

const assert = require('assert');
const trim = require('trim');

function traverse(transform, node, parent) {
    const type = node && node.type;
    const handler = transform.handlers[type] || transform.handlers.default;

    assert(type, `Expected node, got '${node}'`);

    return handler(transform, node, parent);
}

function traverseChildren(transform, parent) {
    const nodes = parent.children || [];
    const length = nodes.length;

    let values = [];
    let index = -1;
    let result;
    let head;

    while (++index < length) {
        result = traverse(transform, nodes[index], parent);

        if (result) {
            if (index && nodes[index - 1].type === 'break') {
                if (result.value) {
                    result.value = trim.left(result.value);
                }

                head = result.children && result.children[0];

                if (head && head.value) {
                    head.value = trim.left(head.value);
                }
            }

            values = values.concat(result);
        }
    }

    return values;
}

traverse.children = traverseChildren;

module.exports = traverse;
