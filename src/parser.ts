import { createReadStream } from 'fs';
import { parse } from '@fast-csv/parse';
import {
    rotate,
    parse_array
} from './utility'



/**
 * Returns Boolean based on data validation
 * @param{Array} data Row from CSV
 * @returns 
 */
const validate = (data: any, result: any[]) => {
    let id: string,
        _eleStr: string,
        _ele: string[],
        size: number,
        valid: boolean = true;

    [id, _eleStr] = data;

    // Restrict CSV Header from validation
    if (id === 'id') {
        return false;
    }

    //Validate ID and Array data in each row
    if (!_eleStr || !id) {
        valid = false;
    }

    _ele = JSON.parse(_eleStr);
    size = Math.sqrt(_ele.length);

    //Validate Array Length and square root of array content should be valid
    if (!_ele.length || size % 1 != 0) {
        valid = false;
    }

    return valid;
}

/**
 * 
 * @param filePath 
 */
export const run = (filePath: string) => {

    return new Promise((resolve, reject) => {
        const options = {
            objectMode: true,
            trim: true
        };

        const csvDataArray: any = [];

        let parser = createReadStream(filePath)
            .pipe(parse())
            .on('error', error => {
                throw new Error(`Error Occured while file read ${error}`);
            })
            .validate((data: any) => validate(data, csvDataArray))
            .on('data-invalid', (row) => {

                if (row[0] == 'id') {
                    process.stdout.write(`id, json_data, is_valid` + '\n');
                    return
                }

                csvDataArray.push({ id: row[0], json_data: `[]`, is_valid: false });
                process.stdout.write(`${row[0]}, "[]", false` + '\n');
            })
            .on('data', row => {
                let id: string, _eleStr: string, _ele: string[], valid: boolean = false;
                [id, _eleStr] = row;
                _ele = JSON.parse(_eleStr);
                let size = Math.sqrt(_ele.length);

                parser.pause();

                //Call function to parse array content 
                let _ele_mat = parse_array(_ele)

                // Trigger Matrix rotate utility fn
                let transform = rotate(size, size, _ele_mat);


                csvDataArray.push({ id, json_data: `[${transform}]`, is_valid: true });
                process.stdout.write(`${id}, "[${transform}]", true` + '\n');

                parser.resume();
            })
            .on('end', (rowCount: number) => {
                process.stdout.write(`Transformation Completed...`);
                return resolve(csvDataArray);
            });
    });
}





