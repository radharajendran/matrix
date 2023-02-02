import { expect, assert } from 'chai';
import 'mocha';
import { spawn } from 'child_process';
import * as path from 'path';
import { run } from '../../src/parser';

describe('Matrix Spiral Rotation from array', () => {
    it('Validates rotated array', async () => {

        const testDataPath = path.join(
            __dirname,
            '../../input.csv',
        )

        const result = await run(testDataPath);
        console.log(result);
        expect(result).to.be.an('array').to.deep.include({ id: '9', json_data: '[]', is_valid: false });
    })

    it('Validates rotated array false statement', async () => {

        const testDataPath = path.join(
            __dirname,
            '../../input_large.csv',
        )

        const result = await run(testDataPath);
        console.log(result);
        expect(result).to.be.an('array').to.not.include({ id: '1', is_valid: false });
    })
});