import assert from 'assert';
import { omitNullAndUndefinedValues } from '../../src/functions';

describe('functions', (): void => {
    describe('omitNullAndUndefinedValues', (): void => {
        it('should filter null values', (): void => {
            assert.deepStrictEqual(
                omitNullAndUndefinedValues({ first: null, second: 0, third: 'text', fourth: undefined }),
                { second: 0, third: 'text' }
            );
        });
    });
});
