const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let width, height;
const map = [];
let inputLines = [];

rl.on('line', (line) => {
    inputLines.push(line);
    if (inputLines.length === 2) {
        width = parseInt(inputLines[0], 10);
        height = parseInt(inputLines[1], 10);
    }
    if (inputLines.length === 2 + height) {
        for (let i = 0; i < height; i++) {
            map.push(inputLines[2 + i]);
        }

        for (let i = 0; i < height; i++) {
            for (let k = 0; k < width; k++) {
                if (map[i][k] === '0') {
                    let right_x = -1, right_y = -1;
                    let bottom_x = -1, bottom_y = -1;

                    for (let j = k + 1; j < width; j++) {
                    right_x = (map[i][j] === '0')?j:right_x;
                    right_y = (map[i][j] === '0')?i:right_y;
                    if (map[i][j] == '0') break;
                    }

                    for (let j = i + 1; j < height; j++) {
                    bottom_x = (map[j][k] === '0')?k:bottom_x;
                    bottom_y = (map[j][k] === '0')?j:bottom_y;
                    if (map[j][k] == '0') break;
                    }

                    console.log(`${k} ${i} ${right_x} ${right_y} ${bottom_x} ${bottom_y}`);
                }
            }
        }
        rl.close();
    }
});
