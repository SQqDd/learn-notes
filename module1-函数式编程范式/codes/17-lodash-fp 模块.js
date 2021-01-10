// lodash fp
// i will be back -> I-WILL-BE-BACK
const fp = require('lodash/fp')

const f = fp.flowRight(fp.join('-'), fp.map(fp.toUpper), fp.split(' '))
const str = 'i will be back'

console.log(f(str))
