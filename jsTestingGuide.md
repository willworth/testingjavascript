---
title: Testing in javascript
date: "2020-01-05"
---


For anything beyond a very simple app, you need to test your javascript, yet there are loads of approaches, with their respective strengths and use cases.  This is a beginner friendly guide to get started testing your Javascript.


## Manual testing
The easiest starting point for js testing is a manual approach.

```javascript
if (result == 4) {
    console.log ('Test passes.')
} else {
    console.log ('Test faileds.')  //keeping this typo
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

How to use npm is out of the scope of this tutorial, but you'll do something like this (in your project directory -and don't forget to make a git ignore file if you're saving your work):

```bash
npm init -y  
npm i mocha --save-dev

```

Mocha is, according to [its site](https://mochajs.org/), *"a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun".*


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
// "It" refers to a specific behaviour being tested.  
// A function will probably have various behaviours you wish to test...
    it('adds two numbers', ()=>{
        const actual = adder(1,3);
        const expected = 4;
        assert.equal(actual, expected)
    })
})
```

As mentioned in the comment above, it's normal to have various "it" assertions for the various activities you wish to test.


## Use deepStrictEqual with js {objects}

The above example compares numbers, but for comparing javascript ***objects***  (imagine your function is returning an object, and that result is what you're testing) you need to use deepStrictEqual.  [Details in the docs](https://nodejs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message).  



## Testing asynchonous functions

You can use a callback (usually named "done"), promises, or - if your dev environment allows it- async await.

From the mocha [docs](https://mochajs.org/#using-async-await):

```javascript
beforeEach(async function() {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```



## Code coverage


If you want to see a percentage of your codebase which is covered by the tests, you can use something like nyc:
```
npm i nyc --save-dev
```

and add it to your test script in `package.json` 
```javascript
"scripts": {
    "test": "nyc mocha"
  }
  ```

and it'll run before your tests, giving you a nice breakdown of your coverage:


 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-|---------|----------|---------|---------|-------------------
 |     100 |      100 |     100 |     100 |                   
 |     100 |      100 |     100 |     100 |                   
-|---------|----------|---------|---------|-------------------



## Jest

Up to this point, we've used mocha, which is a test runner, but we've also needed the assert module from node, and nyc for the coverage.  [Jest](https://jestjs.io/), made by facebook, does all this (and more)...

```
npm i --save-dev jest
```

and then update `package.json`

```javascript
"scripts": {
    "test": "jest --coverage"
  }
  ```

With jest, we don't need the assert module, but there are a couple of changes.
```javascript
//the mocha version
assert.equal(actual, expected)

//becomes, with jest:
expect(actual).toBe(expected)


//and if you need a deep equal, it's 

expect(actual).toEqual(expected)

```

## Going further

There is a lot more to testing - [mock functions](https://jestjs.io/docs/en/mock-functions#using-a-mock-function)(which allow you to test the links between code by erasing the actual implementation of a function), [integration testing](https://en.wikipedia.org/wiki/Integration_testing)(where individual units are combined and tested as a group) and end to end testing- used to validate different integrated components of an application by testing the flow from start to end. 

Hopefully the above helps you get started, and produce better code. Feel free to get in touch with any questions or suggestions.  Thanks.