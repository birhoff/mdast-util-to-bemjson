const unified = require('unified');
const markdown = require('remark-parse');

const expect = require('chai').expect;

const toBemjson = require('../index');

const processor = unified().use(markdown);

describe('Common tests', () => {

    it('should not create array for content with 1 element', () => {
        const tree = processor.parse('# My heading');
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({
            block: 'documentation',
            content: {
                block: 'heading',
                content: 'My heading'
            }
        });
    });
});
