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

    describe('Test code handler', () => {
        it('should convert `code` to `blockcode`', () => {
            const tree = processor.parse(fs.readFileSync(__dirname + '/test-assets/code/simple.md'));
            const bjson = toBemjson(tree);

            expect(bjson).to.deep.equal({
                block: 'documentation',
                content: { block: 'blockcode', content: { elem: 'code', content: 'var p = 1;\n' } }
            });
        });

        it('should highlight `code`', () => {
            const tree = processor.parse(fs.readFileSync(__dirname + '/test-assets/code/simple.md'));
            const bjson = toBemjson(tree, { markdown: { highlight: true } });

            expect(bjson).to.deep.equal({
                block: 'documentation',
                content: {
                    block: 'blockcode',
                    content: {
                        elem: 'code',
                        content: '<span class=\"hljs-keyword\">var</span> p = <span class=\"hljs-number\">1</span>;\n'
                    }
                }
            });
        });
    });
});
