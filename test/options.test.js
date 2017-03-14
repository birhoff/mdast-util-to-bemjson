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

        it('should convert node to block with `options.scope=false`', () => {
            const tree = { type: 'unknown' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'unknown' });
        });

        it('should convert node to elem with `options.scope=true`', () => {
            const tree = { type: 'unknown' };
            const bjson = toBemjson(tree, { scope: true, root: 'myBlock' });

            expect(bjson).to.deep.equal({ elem: 'unknown' });
        });

        it('should converts mods to elemMods with `options.scope=true`', () => {
            const tree = { type: 'heading', depth: 1 };
            const bjson = toBemjson(tree, { scope: true, root: 'myBlock' });

            expect(bjson).to.deep.equal({
                elem: 'heading',
                elemMods: { level: 1 }
            });
        });

    });
});
