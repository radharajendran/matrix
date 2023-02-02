/**
 * Method used to chunk the single array contents to multiple
 * @param{Array} data Array neeeds to be chunk
 * @returns{Array} Chunked array based on content
 */
export const parse_array = (data: string[]): string[][] => {

    const chunkSize = Math.sqrt(data.length);
    const matrix: any[][] = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        matrix.push(chunk);
    }

    return matrix;
}

/**
 * Method used to rotate the matrix elements
 * @param m Row length of matrix
 * @param n Columm Length of matrix
 * @param matrix Matrix
 * @returns Single position rotated array
 */
export const rotate = (m: number, n: number, matrix: string[][]): string[] => {

    let row = 0, col = 0;
    let prev, curr;

    while (row < m && col < n) {
        if (row + 1 == m || col + 1 == n)
            break;

        // Store the first element of next
        // row, this element will replace
        // first element of current row
        prev = matrix[row + 1][col];

        // Move elements of first row from the remaining rows
        for (let i = col; i < n; i++) {
            curr = matrix[row][i];
            matrix[row][i] = prev;
            prev = curr;
        }
        row++;

        // Move elements of last column from the remaining columns
        for (let i = row; i < m; i++) {
            curr = matrix[i][n - 1];
            matrix[i][n - 1] = prev;
            prev = curr;
        }
        n--;


        // Move elements of last row from the remaining rows
        if (row < m) {
            for (let i = n - 1; i >= col; i--) {
                curr = matrix[m - 1][i];
                matrix[m - 1][i] = prev;
                prev = curr;
            }
        }
        m--;

        // Move elements of first column from the remaining rows
        if (col < n) {
            for (let i = m - 1; i >= row; i--) {
                curr = matrix[i][col];
                matrix[i][col] = prev;
                prev = curr;
            }
        }
        col++;

    }

    let result: string[] = [];

    for (let r = 0; r < matrix.length; r++) {

        if (r == 0) {
            result = matrix[r];
        }
        else
            result = result.concat(matrix[r]);
    }

    return result;
}