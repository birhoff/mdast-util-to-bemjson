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
});
