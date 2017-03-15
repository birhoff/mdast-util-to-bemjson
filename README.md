# mdast-util-to-bemjson
Transforms MDAST tree to bemjson regarding to rules.

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[npm]:            https://www.npmjs.org/package/mdast-util-to-bemjson
[npm-img]:        https://img.shields.io/npm/v/mdast-util-to-bemjson.svg

[travis]:         https://travis-ci.org/birhoff/mdast-util-to-bemjson
[test-img]:       https://img.shields.io/travis/birhoff/mdast-util-to-bemjson.svg?label=tests

[coveralls]:      https://coveralls.io/r/birhoff/mdast-util-to-bemjson
[coverage-img]:   https://img.shields.io/coveralls/birhoff/mdast-util-to-bemjson.svg

[david]:          https://david-dm.org/birhoff/mdast-util-to-bemjson
[dependency-img]: http://img.shields.io/david/birhoff/mdast-util-to-bemjson.svg

[greenkeeper]:    https://greenkeeper.io/
[greenkeeper-img]:https://badges.greenkeeper.io/birhoff/mdast-util-to-bemjson.svg

## Requirements

* [Node.js 6+](https://nodejs.org/en/)

## Install

```sh
$ npm install mdast-util-to-bemjson
```

## Usage

```js
const unified = require('unified');
const markdown = require('remark-parse');
const toBemjson = require('mdast-util-to-bemjson');

const mdast = unified().use(markdown).parse('# Hello im _heading_');
const bjson = toBemjson(mdast);

console.log(JSON.stringify(bjson));

// {
//   "block": "documentation",
//   "content": {
//     "block": "heading",
//     "mods": {
//       "level": 1
//     },
//     "content": [
//       "Hello im ",
//       {
//         "block": "emphasis",
//         "content": "heading"
//       }
//     ]
//   }
// }
```

## API

You can specify options with second arg.
```javascript
const toBemjson = require('mdast-util-to-bemjson');

toBemjson({/* ...tree */}, {/* options */});
```

### Plugin options

* *String|Object* **root** — Define block wrapper. Default — `documentation`.
* *Boolean* **scope** — Define how to render nodes as blocks or elements. If `true` render as elements of `root` block. Default — `false`.
* *Boolean* **tag** — Define render html tags to block. Default — `false`.


License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
