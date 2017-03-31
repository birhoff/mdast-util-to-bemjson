'use strict';

const expect = require('chai').expect;

const toBemjson = require('../index');

describe('Common tests', () => {

    it('should not create array for content with 1 element', () => {
        const tree = { type: 'node', children: [{ type: 'child-node' }] };
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({
            block: 'node',
            content: { block: 'child-node' }
        });
    });

    it('should decamelize node.type', () => {
        const tree = { type: 'MyNodeType' };
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({ block: 'my-node-type' });
    });


    it('should decamelize!!!1', () => {
        const unified = require('unified');
        const markdown = require('remark-parse');
        const toBemjson = require('../index');

        const mdast = unified().use(markdown).parse('# Hello im _heading_');
        const bjson = toBemjson(mdast);

        console.log(JSON.stringify(bjson, null, 4));
    });
});
