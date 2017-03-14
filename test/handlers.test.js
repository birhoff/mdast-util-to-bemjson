'use strict';

const fs = require('fs');

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

    it('should not convert `text` as block', () => {
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

    describe('Test `default` handler', () => {
        it('should convert `unknown` node to block', () => {
            const tree = { type: 'unknown' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'unknown' });
        });

        it('should convert `unknown` node with value to block with content', () => {
            const tree = { type: 'unknown', value: 'some content' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'unknown', content: 'some content' });
        });

        it('should convert `unknown` node with `options.tag=true` block with tag', () => {
            const tree = { type: 'unknown' };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({ block: 'unknown', tag: 'unknown' });
        });

        it('should convert `unknown` node with one children to block with content without array', () => {
            const tree = { type: 'unknown', children: [{ type: 'some-node' }] };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'unknown', content: { block: 'some-node' } });
        });

        it('should convert `unknown` node with children to block with content[]', () => {
            const tree = { type: 'unknown', children: [{ type: 'some-node' }, { type: 'some-node2' }] };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({
                block: 'unknown',
                content: [{ block: 'some-node' }, { block: 'some-node2' }]
            });
        });
    });

    describe('Test code handler', () => {
        it('should convert `code` to `blockcode`', () => {
            const tree = processor.parse(fs.readFileSync(__dirname + '/test-assets/code/simple.md'));
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({
                block: 'documentation',
                content: {
                    block: 'blockcode',
                    mods: { lang: 'javascript' },
                    content: { elem: 'code', content: 'var p = 1;\n' }
                }
            });
        });

        it('should highlight `code`', () => {
            const tree = processor.parse(fs.readFileSync(__dirname + '/test-assets/code/simple.md'));
            const bjson = toBemjson(tree, { markdown: { highlight: true } });

            expect(bjson).to.deep.equal({
                block: 'documentation',
                content: {
                    block: 'blockcode',
                    mods: { lang: 'javascript' },
                    content: {
                        elem: 'code',
                        content: '<span class=\"hljs-keyword\">var</span> p = <span class=\"hljs-number\">1</span>;\n'
                    }
                }
            });
        });

        it('should convert with properly tags', () => {
            const tree = { type: 'code', lang: 'javascript', value: 'var p = null;' };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({
                block: 'blockcode',
                mods: { lang: 'javascript' },
                tag: 'pre',
                content: {
                    elem: 'code',
                    tag: 'code',
                    content: 'var p = null;\n'
                }
            });
        });

        it('should add lang mod', () => {
            const tree = { type: 'code', lang: 'javascript', value: 'var p = null;' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({
                block: 'blockcode',
                mods: { lang: 'javascript' },
                content: {
                    elem: 'code',
                    content: 'var p = null;\n'
                }
            });
        });
    });
});
