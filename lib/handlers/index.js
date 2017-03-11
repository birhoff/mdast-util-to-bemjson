'use strict';

module.exports = {
    blockquote: ignore,
    'break': ignore,
    code: ignore,
    'delete': ignore,
    emphasis: ignore,
    footnoteReference: ignore,
    footnote: ignore,
    heading: ignore,
    html: ignore,
    imageReference: ignore,
    image: ignore,
    inlineCode: ignore,
    linkReference: ignore,
    link: ignore,
    listItem: ignore,
    list: ignore,
    paragraph: ignore,
    root: require('./root'),
    strong: ignore,
    table: ignore,
    text: ignore,
    thematicBreak: ignore,
    yaml: ignore,
    definition: ignore,
    footnoteDefinition: ignore,

    // When unsupported type
    unsupported: require('./unsupported')
};

function ignore() {
    return null;
}
