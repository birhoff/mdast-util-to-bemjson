module.exports = {
    block: 'documentation',
    content: [{
        block: 'blockcode',
        content: { elem: 'code', content: 'var p = null;\n' },
        mods: { lang: 'javascript' }
    }, { block: 'blockquote', content: { block: 'paragraph', content: 'my blockquote' } },
        { block: 'html', content: '<h1>qwerty</h1>' },
        { block: 'heading', mods: { level: 1 }, content: 'Heading' },
        { block: 'heading', mods: { level: 2 }, content: 'Heading 2' }, { block: 'thematic-break' }, {
            block: 'list',
            mods: { type: 'ul' },
            content: [{ block: 'list-item', content: { block: 'paragraph', content: 'item 1' } },
                { block: 'list-item', content: { block: 'paragraph', content: 'item 2' } }]
        }, {
            start: 5,
            block: 'list',
            mods: { type: 'ol' },
            content: [{ block: 'list-item', content: { block: 'paragraph', content: 'item 5' } },
                { block: 'list-item', content: { block: 'paragraph', content: 'item 6' } }]
        }]
};
