module.exports = {
    block: 'documentation',
    content: [{ block: 'heading', mods: { level: 1 }, content: 'BEMHTML: шаблонизатор для БЭМ' },
        { block: 'paragraph', content: { block: 'link', content: 'Youtube 1' } }, {
            block: 'paragraph',
            content: [{ block: 'strong', content: 'BEMHTML' },
                ' — шаблонизатор (шаблонный движок) для тех, кто ведет веб-разработку в рамках ',
                { block: 'link', content: 'БЭМ-методологии' }, '.\nBEMHTML — это:']
        }, {
            block: 'list',
            mods: { type: 'ul' },
            content: [{
                block: 'listItem',
                content: {
                    block: 'paragraph',
                    content: 'HTML-верстка в терминах блоков, элементов, модификаторов;'
                }
            }, { block: 'listItem', content: { block: 'paragraph', content: 'поддержка CSS в стиле БЭМ;' } }]
        }, { block: 'heading', mods: { level: 2 }, content: 'BEMHTML: картина мира' }, {
            block: 'paragraph',
            content: 'Этот принцип не специфичен для веб-разработки и вряд ли вызовет возражения. Тем не менее, технологические особенности многих шаблонизаторов нередко вынуждают дублировать код. Это проявляется во всех ситуациях, когда один и тот же элемент интерфейса (например, кнопка) используется многократно. В большинстве шаблонизаторов HTML-код, описывающий кнопку, придется повторить на всех страницах, где она используется. Когда кнопку потребуется усложнить, разработчику придется отредактировать шаблоны всех страниц, где она присутствует. Даже если шаблонизатор позволяет вынести код кнопки в общую функцию, на всех страницах нужно будет заменить код кнопки вызовом этой функции.'
        }, {
            block: 'paragraph',
            content: [{
                block: 'strong',
                content: 'Задача шаблонизатора: возможность создания гибких библиотек шаблонов'
            }, '.']
        }, { block: 'heading', mods: { level: 3 }, content: '«БЭМ головного мозга»' }, {
            block: 'paragraph',
            content: 'BEMHTML представляет собой распространение БЭМ-методологии на еще одну технологию — HTML. БЭМ предлагает дизайнеру, разработчику интерфейса, JavaScript-программисту работать в терминах единой предметной области — блоков, элементов, модификаторов. BEMHTML позволяет HTML-верстальщику присоединиться к ним.'
        }, { block: 'heading', mods: { level: 4 }, content: 'Примеры' },
        { block: 'paragraph', content: 'Данные (БЭМ-дерево), которые шаблонизатор принимает на вход:' }, {
            block: 'blockcode',
            content: {
                elem: 'code',
                content: '{\n  block: &#39;widgets&#39;,\n  content: [\n    {\n      elem: &#39;weather&#39;,\n      content: 4\n    }\n  ]\n}\n'
            },
            mods: { lang: 'js' }
        }]
};
