'use strict';

function root(transform, node) {
    const opts = transform.options;
    const rootBlock = opts.root ||  'documentation';

    return transform(node, rootBlock);
}

module.exports = root;
