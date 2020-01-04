const adder = require('../adder');
const assert = require('assert')


const result = adder(1,3);
const expected = 4;
// if (result == 4) {
//     console.log ('Test passes.')
// } else {
//     throw new Error ('Expected 1 + 3 to equal 4.')
// }



assert.equal(result, expected, "optional custom message")