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
        const tree = { type: 'text', value: 'my-text' };
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal('my-text');
    });

    it('should not add tag to `html`', () => {
        const tree = { type: 'html', value: 'some html' };
        const bjson = toBemjson(tree, { tag: true });

        expect(bjson).to.deep.equal({ block: 'html', content: 'some html' });
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

        it('should convert unhandled nodes to right blocks and tags', () => {
            const tree = {
                type: 'root', children: [
                    { type: 'listItem' },
                    { type: 'paragraph' },
                    { type: 'emphasis' },
                    { type: 'delete' },
                    { type: 'inlineCode' }
                ]
            };
            const bjson = toBemjson(tree, { tag: true, root: 'my-root' });

            expect(bjson).to.deep.equal({
                block: 'my-root', content: [
                    { block: 'list-item', tag: 'li' },
                    { block: 'paragraph', tag: 'p' },
                    { block: 'emphasis', tag: 'em' },
                    { block: 'del', tag: 'del' },
                    { block: 'code', tag: 'code' }
                ]
            });
        });
    });

    describe('Test `code` handler', () => {
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

    describe('Test `heading` handler', () => {
        it('should convert `heading` node to block', () => {
            const tree = { type: 'heading', depth: 1 };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'heading', mods: { level: 1 } });
        });

        it('should convert `heading` node with `options.tag`', () => {
            const tree = { type: 'heading', depth: 1 };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({ block: 'heading', mods: { level: 1 }, tag: 'h1' });
        });
    });

    describe('Test `list` handler', () => {
        it('should convert to unordered list', () => {
            const tree = { type: 'list', ordered: false };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'list', mods: { type: 'ul' } });
        });

        it('should convert to ordered list', () => {
            const tree = { type: 'list', ordered: true };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'list', mods: { type: 'ol' } });
        });

        it('should convert to `tag:ul/ol` with `options.tag`', () => {
            const tree = { type: 'list', ordered: true };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({ block: 'list', mods: { type: 'ol' }, tag: 'ol' });
        });

        it('should add `start` to properties', () => {
            const tree = { type: 'list', ordered: false, start: 5 };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'list', mods: { type: 'ul' }, start: 5 });
        });

        it('should not add `start=1` to properties', () => {
            const tree = { type: 'list', ordered: false, start: 1 };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'list', mods: { type: 'ul' } });
        });
    });

    describe('Test `paragraph` handler', () => {
        it('should convert with `tag:p`', () => {
            const tree = { type: 'paragraph' };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({ block: 'paragraph', tag: 'p' });
        });
    });

    describe('Test `table` handler', () => {
        it('should convert simple `table` with 2 rows', () => {
            const tree = require('./test-assets/simple-table.mdast');
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal(require('./test-assets/simple-table.bemjson'));
        });

        it('should convert simple `table` with tags', () => {
            const tree = require('./test-assets/simple-table.mdast');
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal(require('./test-assets/simple-table.tags.bemjson'));
        });

        it('should convert empty `table`', () => {
            const tree = { type: 'table' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'table' });
        });

        it('should convert `table` without tbody', () => {
            const tree = {
                type: 'table',
                children: [{
                    type: 'tableRow',
                    children: [{ type: 'tableCell', children: [{ type: 'text', value: 'my-cell' }] }]
                }]
            };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({
                block: 'table',
                content: [{
                    elem: 'thead',
                    content: { elem: 'row', content: [{ elem: 'th', content: 'my-cell' }] }
                }]
            });
        });

        it('should convert `table` with align', () => {
            const tree = { type: 'table', align: ['top', 'left'] };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'table', align: ['top', 'left'] });
        });
    });

    describe('Test `break` handler', () => {
        it('should convert to block `break`', () => {
            const tree = { type: 'break' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'break' });
        });

        it('should convert to block `break` with tag `br` and `bem=false`', () => {
            const tree = { type: 'break' };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({ block: 'break', tag: 'br', bem: false });
        });
    });

    describe('Test `link` handler', () => {
        it('should convert to block `link`', () => {
            const tree = { type: 'link', url: 'google.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'link', href: 'google.com' });
        });

        it('should convert to block `link` with tag `a`', () => {
            const tree = { type: 'link', url: 'google.com' };
            const bjson = toBemjson(tree, { tag: true });

            expect(bjson).to.deep.equal({ block: 'link', tag: 'a', attrs: { href: 'google.com' }, href: 'google.com' });
        });

        it('should convert to block `link` with title', () => {
            const tree = { type: 'link', url: 'google.com', title: 'my title' };
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({ block: 'link', href: 'google.com', title: 'my title' });
        });
    });
});
