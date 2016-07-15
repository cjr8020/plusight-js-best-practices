
Pluralsight JavaScript Best Practices

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



Why do we need best practices?
******************************

1. Write code in a Maintainable way
-----------------------------------

- Prevent the .01% of issues
- 'this' keyword
- strict mode
- closures




Syntax
===================================================
    
Semicolons
----------

    "Semicolons are optional in JavaScript"
    
EcmaScript Standards

    "Certain ECMAScipt statemetns must be terminated by semicolons"
    "..however, they can be omitted in certain situations"
    ".. are automatically inserted .."
    

Automatic Semicolon Insertion
-----------------------------

3 rules the parser is looking at:

1) "when a token is encountered that is not allowed by any production of the grammar"
    
    E.g.:

    var a = 12;
    var b = 13  # the 'v' is not allowed in this context, so the rule kicks in

2) the offending token is the "}" closing curly brace..

    if(a){console.log(a);}  // the parser will place the ';' before the closing brace
    
    
3) at the end of the token string (i.e. at the end of the file)


IIFY 

var c = b + a

(function() {
    console.log('inside my iife);
    console.log('doing secret stuff .. ');
})();

YOU WILL GET BITTEN SOONER OR LATER

    "restricted production" =
        continue, break, return or throw...
        
    return (;)
    {
        hi: 'hello'
    }

    semicolon is inserted where I don't WANT it!
    
    Using (;) in this situation is not going to solve the problem.

    RULES
    *****
    
    1. use semicolons in conjunction 




Linging
--------

    A linter scans your code to detect potential problems and errors.
    
    JSLint
        1st linting tool in 2002
        preconfigured
        not very configurable
        
    JSHint
        a fork of JSLint
        much more configurable
        built in package support
        Not extensible..
        
    ESLint 
        most recent of the three
        custom rule support
        very configurable
        


Curly Braces
------------

    Closing curly brace on separate line is a problem with JavaScript


Equality
--------

    == || ===
    
    == 
        coerces to the same type which may produce unexpected results
    
    ===
        does not do coercion
        
        checking for existance
        ----------------------

    if (x) // checking for existence

    This could be problematic:
    
    if (x == true) // that is essentially what is going on 
    
    so if 
    
    x = 0;  // x will be coerced to boolean and it will be false!!
    
    meaning:
    
    if (x) // x does not exist .. but it DOES!!
    
    The safe way to check for existence:
    
    if (typeof x !== 'undefined') {
        // do work
    }
    
    


Configuring JSHint
------------------

    jshint.com/docs/options

    .jshint.rc
    
    {
        "eqeqeq" = true
    }


Variables
---------

    console.log(myVariable); // should throw an error "not defined"
    var myVariable = 10;     // undefined again!
    
    Hoisting =
        JavaScript's default behavior of moving all declarations to the top of the current scope
        
        The parser runs thru your code twice:
        1. first, to place all veriables/functions/etc in the execution context(s)
        2. second, to run your code
        
    Variables are created when their containing lexical environment is instantiated.
    
    Variable are initialized to 'undefined' when created.
    
    Best practice:
    
        All var declarations go to the top of your scope due to JavaScript hoisting.
        


Functions
---------

    Two types of functions:
    
    Function declaration (or statement)
    Function expression


    In JavaScript, functions are 1st-class objects - they can be assigned:
    
    expression(); // 'undefined' is not a function!!!

    var expression = function() {
        console.log("hi from my expression);
    }

    Best practices with functions:
                    
    1. declare your variables first
    2. create your functions second
    3. run code last
    
    This order applies to global scope or function scope.



Behaviors
===================================================

JavaScript "convenience" services

Global Variables
----------------

LHS (left-hand-side) reference.
Here, JavaScript conveniently adds 'var' declaration for you where you forgot to type it .. however, it adds the variable to Global scope

function print(out) {
    stringToPrint = out;        // 'forgot' to use 'var'.. 
    console.log(stringToPrint); // should be in function scope.. right?
}

print('Hello');
console.log(stringToPrint);  // pring 'Hello' which is in global scope.

use "Strict Mode" in Global scope
*********************************

    'use strict';

Read-Only Properties
--------------------

    Object.defineProperty(obj, 'readOnly', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: 'This var is read only'
    });

    obj.readOnly = 'I wrote this';
    console.log(obj.readOnly); // displays 'This var is read only'

JavaScript is trying to be helpful again by silently ignoring your update instead of blowing up as you'd expect.

    'use strict'; // will fix the above
        
Deleting properties
--------------------
    
JavaScript tries to be helpful and just silently ignores 'delete' that could not be deleted.

    use with 'use strict';
    
Duplicates
----------
    
'use strict'; ensures you cannot have duplicate function parameters
        
Octals and Hex
----------------
    
012     if you stick a zero in front of a number, JavaScript will assume it is an          octal number

For reference, 
    
0x12    this would be hexadecimal    

With 'use strict' I would use parseInt(12, 8) to create octal numbers.


The 'with' Statement
--------------------
    
var obj  = {
    a: {
        b: {
            c: 'hello'
        }
    }
}     

console.log(obj.a.b.c); // painful
  
'with' is supposed to simplify things:
        
with(obj.a.b) {
    console.log(c);
}        
        
        
However, if I declare a variable by the same name in global scope, we don't know what c refers to any more.

'strict' will disallow the use of 'with'



var c = 'this is important';
    

'this' keyword
--------------
    
var obj = {
    val: 'Hi there',
    printVal: function() {
        console.log(this.val);  // 'this' will point at the owning object
    }
};

var obj2 = {
    val: 'whats up'
};

obj2.printVal = obj.printVal;  
obj2.printVal(); // prints 'whats up'


'use strict' disables binding this to global scope:

print();  // will not automatically bind to global scope

    use bind()

var print = obj.printVal.bind(obj2);
print(); // 'this' is now bound to obj2

    'new' objects
    
var obj = function() {
    this.hello = 'hello';
    this.greet = function(){
        console.log(this.hello);
    }
}    
    
var greeter = new obj();  // 'new' creates a new scope

Best practice: use '_this' or 'self' instead of 'this'


Async Patterns
===================================================       
  
 Callbacks
 ---------
        
Callback hell - christmas tree looking code.

Rule 1: no one says you have to use anonymous functions.


Promises
---------

    extract callbacks 
    provide separation of concern
    
Here is a typicaly christmas tree code:

    function asyncMethod(message, db) {
        setTimeout(function(){
            console.log(message);
            cb();
        }, 500)
    }

    asyncMethod('Open DB Connection', function(){
        asyncMethod('Find user', function(){
            asyncMethod('validate user', function(){
                asyncMethod('do stuff', fumnction(){})
            }
        })
    })

Let's fix this using promises...
A promise makes our functions "thennable"

// fix the above code by using promises 
// promisejs.org
// <script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"></script>

  function asyncMethod(message) {
    return new Promise(function (fulfill, reject) {
      setTimeout(function () {
        console.log(message);
        fulfill();
      }, 500)
    });
  }

  // get rid of anonymous functions

  function findUser() {
    return asyncMethod('Find User');
  }

  function validateUser(){
    return asyncMethod('Validate User');
  }

  function doStuff(){
    return asyncMethod('do stuff');
  }

  asyncMethod('Open DB Connection')
    .then(findUser)
    .then(validateUser)
    .then(doStuff)
    .then(function(){});
        
    
Using ES6 and Babel
-------------------

You should be using ES6 code.

Babel = JavaScript compiler allowing to you to use next gen JavaScript in the browser before it supports it.


Async / Await
-------------------

Async functions
  - build upon ES6 promises
  - use generators for async programming to allow you to use simple semantic syntax

http://kangax.github.io/compat-table/es6

Babel-core supports Async functions in stage 3.


$ npm install -save babel-preset-stage-3

.babelrc

{
  "presets": [
    "stage-3"
  ],
  "plugins": []
}


Production Code 
===================================================   


NPM
----

Use NPM to get

$ npm init

- package.json
- 

Environment
------------



Simplify Your World
-------------------

Don't get confused "Getting Things Done the Simple Way" with "Using the Tool"


  Best practices !== Toolset
  
Keep your enviroment simple.
Don't use things because they are cool, but because they actually help you get the job done.





