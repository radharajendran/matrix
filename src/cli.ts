import * as fs from 'fs';
import { parseStream } from 'fast-csv';
import { argv } from 'process';
import {
    rotate,
    parse_array
} from './rotate_matrix'

function csv_parse(filePath: string) {
    const options = {
        objectMode: true,
        trim: true
    };

    const stream = fs.createReadStream(filePath);
    let csv_data = []

    parseStream(stream, options)
        .on('error', error => {
            throw new Error(`Error Occured while file read ${error}`);
        })
        .on('data', row => {
            //csv_data.push(row)
            console.log('row=------', row)
            if (row[0] == 'id')
                return;


            let _ele: string[] = JSON.parse(row[1]);

            let size = Math.sqrt(_ele.length);

            if (size % 1 == 0) {
                console.log('valid------>', _ele);

                let _ele_mat = parse_array(_ele)
                let transform = rotate(size, size, _ele_mat);

                console.log('transform------>', 'size--->', size, transform)
            }
            else {
                console.log('invalid------>', _ele);
            }
        })
        .on('end', (rowCount: number) => {

        });
}

if (!argv[2])
    throw new Error('CSV File missing in Input Parameter');

csv_parse(argv[2])

// let matrix = [[1, 2, 3, 4],
// [5, 6, 7, 8],
// [9, 10, 11, 12],
// [13, 14, 15, 16]];

// matrix_rotate(4, 4, matrix);