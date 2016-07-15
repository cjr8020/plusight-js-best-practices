/*function asyncMethod(message, cb){
    setTimeout(function(){
        console.log(message);
        cb();
    }, 500)
}*/

/*asyncMethod('Open DB Connection', function () {
  asyncMethod('Find User', function () {
    asyncMethod('Validate User', function () {
      asyncMethod('do stuff', function () {})
    })
  })
})*/

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
