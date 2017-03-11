const unified = require('unified');
const markdown = require('remark-parse');

const expect = require('chai').expect;

const toBemjson = require('../index');

const processor = unified().use(markdown);

describe('Test node handlers', () => {
    it('should convert `root` to `documentation`', () => {
        const tree = processor.parse('');
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({ block: 'documentation' });
    });
});
