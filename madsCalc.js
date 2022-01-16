const process = require('process')
let allowedOps = ['*', '+', '/', '-',]

const add = (a, b) => parseInt(a) + parseInt(b)
const sub = (a, b) => a - b
const multi = (a, b) => a * b
const div = (a, b) => a / b

const doOp = (sw, a, b) => {
    let res
    switch (sw) {
        case '*':
            res = multi(a, b);
            break;

        case '+':
            res = add(a, b);
            break;

        case '-':
            res = sub(a, b);
            break;

        case '/':
            res = div(a, b);
            break;
    }
    return res
}

const validate = (arr) => {
    let input = [...arr]
    const first = arr[0];
    const last = arr[arr.length - 1];

    if(allowedOps.includes(first) || allowedOps.includes(last)){
        return false
    }

    input.forEach((ele,i) => {
        if(!allowedOps.includes(ele) || !isNaN(ele) ){
            return false
        }

        if(i % 2 != 0 && allowedOps.includes(ele)){
            return false
        }
    })
    return true
}


const main = (input) => {
    let newIp = input.split(' ')
    let output;
    const validation = validate(newIp)
    if(!validation){
        return
    }
    for (let i = 0; i < allowedOps.length; i++) {
            for(let j=0; j<newIp.length; j++){
            if (allowedOps[i] == newIp[j]) {
                output = doOp(newIp[j], newIp[j - 1], newIp[j + 1])
                if(j - 1 === 0){
                    newIp.splice(0,3,output)
                }else{
                    newIp.splice(j - 1, j + 1, output)
                }
            }
        }
    }
    return output
}


// to run node madsCalc.js 'expression'
let input = process.argv[2]
console.log(main(input))