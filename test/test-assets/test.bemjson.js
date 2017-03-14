module.exports = {
    block: 'documentation',
    content: [{ block: 'heading', content: [{ block: 'text', content: 'BEMHTML: шаблонизатор для БЭМ' }] }, {
        block: 'paragraph',
        content: [{ block: 'link', content: [{ block: 'text', content: 'Youtube 1' }] }]
    }, {
        block: 'paragraph',
        content: [{ block: 'strong', content: [{ block: 'text', content: 'BEMHTML' }] }, {
            block: 'text',
            content: ' — шаблонизатор (шаблонный движок) для тех, кто ведет веб-разработку в рамках '
        }, { block: 'link', content: [{ block: 'text', content: 'БЭМ-методологии' }] },
            { block: 'text', content: '.\nBEMHTML — это:' }]
    }, {
        block: 'list',
        content: [{
            block: 'listItem',
            content: [{
                block: 'paragraph',
                content: [{ block: 'text', content: 'HTML-верстка в терминах блоков, элементов, модификаторов;' }]
            }]
        }, {
            block: 'listItem',
            content: [{
                block: 'paragraph',
                content: [{ block: 'text', content: 'поддержка CSS в стиле БЭМ;' }]
            }]
        }]
    }, { block: 'heading', content: [{ block: 'text', content: 'BEMHTML: картина мира' }] }, {
        block: 'paragraph',
        content: [{
            block: 'text',
            content: 'Этот принцип не специфичен для веб-разработки и вряд ли вызовет возражения. Тем не менее, технологические особенности многих шаблонизаторов нередко вынуждают дублировать код. Это проявляется во всех ситуациях, когда один и тот же элемент интерфейса (например, кнопка) используется многократно. В большинстве шаблонизаторов HTML-код, описывающий кнопку, придется повторить на всех страницах, где она используется. Когда кнопку потребуется усложнить, разработчику придется отредактировать шаблоны всех страниц, где она присутствует. Даже если шаблонизатор позволяет вынести код кнопки в общую функцию, на всех страницах нужно будет заменить код кнопки вызовом этой функции.'
        }]
    }, {
        block: 'paragraph',
        content: [{
            block: 'strong',
            content: [{
                block: 'text',
                content: 'Задача шаблонизатора: возможность создания гибких библиотек шаблонов'
            }]
        }, { block: 'text', content: '.' }]
    }, { block: 'heading', content: [{ block: 'text', content: '«БЭМ головного мозга»' }] }, {
        block: 'paragraph',
        content: [{
            block: 'text',
            content: 'BEMHTML представляет собой распространение БЭМ-методологии на еще одну технологию — HTML. БЭМ предлагает дизайнеру, разработчику интерфейса, JavaScript-программисту работать в терминах единой предметной области — блоков, элементов, модификаторов. BEMHTML позволяет HTML-верстальщику присоединиться к ним.'
        }]
    }, { block: 'heading', content: [{ block: 'text', content: 'Примеры' }] }, {
        block: 'paragraph',
        content: [{ block: 'text', content: 'Данные (БЭМ-дерево), которые шаблонизатор принимает на вход:' }]
    }, {
        block: 'code',
        content: '{\n  block: \'widgets\',\n  content: [\n    {\n      elem: \'weather\',\n      content: 4\n    }\n  ]\n}'
    }]
};
