const adder = require('../adder');
// const assert = require('assert')  // no longer needed once using jest.


// const result = adder(1,3);
// const expected = 4;
// if (result == 4) {
//     console.log ('Test passes.')
// } else {
//     throw new Error ('Expected 1 + 3 to equal 4.')
// }


// This is the straight node assert version:
// assert.equal(result, expected, "optional custom message")


// Now with mocha

// describe ('The adder function', () =>{

//     it('adds two numbers', ()=>{
//         const actual = adder(1,3);
//         const expected = 4;


//         assert.equal(actual, expected)
//     })



// })


// With jest we don't need the assert module:

describe ('The adder function', () =>{

    it('adds two numbers', ()=>{
        const actual = adder(1,3);
        const expected = 4;


        expect(actual).toBe(expected)
    })



})