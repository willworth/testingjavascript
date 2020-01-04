const adder = require('./adder');



const result = adder(1,3);

if (result == 4) {
    console.log ('Test passes.')
} else {
    throw new Error ('Expected 1 + 3 to equal 4.')
}