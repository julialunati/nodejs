//dz1 

const colors = require('colors');

const arg = process.argv.slice(2);

function isPrime(i, n) {
    let arr = [];
    for (i; i <= n; i++) {
        let flag = 1;
        if (i > 2 && i % 2 != 0) {
            for (let j = 3; j * j <= i; j = j + 2) {
                if (i % j == 0) {
                    flag = 0;
                    break;
                }
            }
        } else if (i != 2) flag = 0;
        if (flag == 1) {
            arr.push(i);
        }
    }
    return arr;
}

if (Number.isInteger(+arg[0]) && Number.isInteger(+arg[1]) && arg[0] > 0 && arg[1] > 0 && arg[0] < arg[1]) {

    let arr = isPrime(+arg[0], +arg[1]);

    if (arr.length === 0) {
        console.log(colors.red("There's no prime numbers!"));
    } else {
        for (let i = 0; i < arr.length; i += 3) {
            if (i in arr) {
                console.log(colors.green(arr[i]));
            }
            if (i + 1 in arr) {
                console.log(colors.yellow(arr[i + 1]));
            }
            if (i + 2 in arr) {
                console.log(colors.red(arr[i + 2]));
            }
        }
    }

} else {

    console.log("Range error, please provide numbers with a positive value");

}
