'use strict';

const expect = require('chai').expect;

const toBjast = require('../index');

describe('Test converter options', () => {
    describe('Test options.augment', () => {

        it('should not change flow without option `options.augment`', () => {
            const bjast = toBjast({ type: 'root' });

            expect(bjast).to.deep.equal({ block: 'md-root' });
        });
    });
});
