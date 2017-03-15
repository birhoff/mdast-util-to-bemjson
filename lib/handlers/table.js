'use strict';

const parseBlock = require('../build-node').parse;

function table(transform, node) {
    const options = transform.options;
    const block = parseBlock(node.type);

    const props = {};
    node.align && (props.align = node.align);

    if (options.tag) {
        props.tag = node.type;
    }

    if (!node.children) return transform(node, block, props);

    const tHead = {
        elem: 'thead',
        content: {
            elem: 'row',
            content: (node.children[0].children || []).map(cellNode => {
                const tCell = { elem: 'th', content: transform(cellNode, null, null, cellNode.value).content };
                if (options.tag) {
                    tCell.tag = 'th';
                }
                return tCell;
            })
        }
    };

    if (options.tag) {
        tHead.tag = 'thead';
        tHead.content.tag = 'tr';
    }

    const tBody = {
        elem: 'tbody',
        content: (node.children.slice(1) || []).map(rowNode => {
            const tRow = {
                elem: 'row',
                content: (rowNode.children || []).map(cellNode => {
                    const tCell = { elem: 'cell', content: transform(cellNode, null, null, cellNode.value).content };
                    if (options.tag) {
                        tCell.tag = 'td';
                    }
                    return tCell;
                })
            };

            if (options.tag) {
                tRow.tag = 'tr';
            }

            return tRow;
        })
    };

    if (options.tag) {
        tBody.tag = 'tbody';
    }

    block.content = [tHead];

    if (tBody.content.length) {
        block.content.push(tBody);
    }

    return transform(node, block, props);
}

module.exports = table;
