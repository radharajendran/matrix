import { argv } from 'process';



/*
 * This is written as a self calling function so I don't have to place
 * 'use strict' in global scope.
 * This prevents problems when concatenating scripts that are not strict.
 */
(async function () {
    'use strict';
    if (!argv[2])
        throw new Error('CSV File missing in Input Parameter');

    const parser = await import('./parser');

    // Call the task
    return await parser.run(argv[2]);
}());