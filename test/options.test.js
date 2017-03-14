const unified = require('unified');
const markdown = require('remark-parse');

const expect = require('chai').expect;

const toBemjson = require('../index');

const processor = unified().use(markdown);

describe('Test converter options', () => {
    describe('Test options.root', () => {

        it('should `options.root=false` convert `root` to `documentation`', () => {
            const tree = processor.parse('');
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'documentation' });
        });

        it('should `options.root=myBlock` convert `root` to `myBlock`', () => {
            const tree = processor.parse('');
            const bjson = toBemjson(tree, { root: 'myBlock' });

            expect(bjson).to.deep.equal({ block: 'myBlock' });
        });

    });

    describe('Test options.scope', () => {

        it('should `options.scope=false` convert `heading` to `block: heading`', () => {
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

        it('should `options.scope=true` convert `heading` to `elem: heading`', () => {
            const tree = processor.parse('# My heading');
            const bjson = toBemjson(tree, { scope: true, root: 'myBlock' });

            expect(bjson).to.deep.equal({
                block: 'myBlock',
                content: {
                    block: 'myBlock',
                    elem: 'heading',
                    content: 'My heading'
                }
            });
        });

    });
});
