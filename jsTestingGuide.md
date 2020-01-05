# Testing in javascript

For anything beyond a very simple app, you need to test your javascript, yet there are loads of approaches, with their respective strengths and use cases.  This is a beginner friendly guide to the most useful and common testing set ups in Javascript.


## Manual testing
The easiest starting point for js testing is a manual approach.

```javascript
if (result == 4) {
    console.log ('Test passes.')
} else {
    console.log ('Test faileds.')
}

```
Getting a little more sophisticated, we can (intentionally, for once!) generate an error:


```javascript
if (result == 4) {
    console.log ('Test passes.')
} else {
    throw new Error ('Expected 1 + 3 to equal 4.')
}

```
If you're working with node, which I'm assuming you are, you can have a dedicated test file.  So for `myFunction.js` you'd have `myFunction.spec.js`  (or `myFunction.test.js`).

Having the tests in a separate file is tidier, and, once you've required the main module, you can just run the test file from the command line:

```bash
node myFunction.spec
```

 you can include the [assert module](https://nodejs.org/api/assert.html):

```javascript
const assert = require('assert')
```


and you've then got various standard assertions available.  A test for equality, for example, takes in a result, what you were hoping it would be, and an optional message:

```javascript
assert.equal(result, expected, ‘optional custom message’)
```

So we are calling the test file to run in node from the commandline (as above):
```bash
node myFunction.spec
```

But, of course, this doesn't scale well, which brings us to test runners.

## Test runners

Using npm is out of the scope of this tutorial, but you'll do something like this(in your project directory):

```bash
npm init -y  
npm i mocha --save-dev

```

Mocha is, according to [its site](https://mochajs.org/), *"a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun."*


Mocha is configured via `package.json`.  You can see the repo for this tutorial [here](https://github.com/willworth/testingjavascript).


Once you have Mocha set up, you'll have much better tools available.  Within your `myFunction.spec.js` you can describe what you want.  Here, I'm testing a simple adding function for demonstration purposes. 

The function:
```javascript
const adder = function(x,y){
    return x + y;
}
module.exports = adder;
```
And in the test file:
```javascript
// outer function "describe" is for the overall function being tested
describe ('The adder function', () =>{
// "It" refers to a specific behaviour being tested.  A function will probably have varions behavious you wish to test...
    it('adds two numbers', ()=>{
        const actual = adder(1,3);
        const expected = 4;
        assert.equal(actual, expected)
    })
})
```

As mentioned in the comment above, it's normal to have various "it" assertions for the various activities you wish to test.