/** Everything inside function is automatically wrapped in promise. It creates the promise and then what is returned is the resolve.
  * Equivalent to return Promise.resolve(1); 
  */
async function simpleFunction() {
  promise = new Promise((resolve, reject) => {
    setTimeout((()=> resolve('Promise complete')), 3000)
  });
  result = await promise // wait till promise resolves then take that value.
  console.log(promise)

  return promise
}

/** call the simple function returns a promise, then we invoke the promise.  */
simpleFunction().then(result => console.log('Then function fired with result ' + result + ' '));

/** 
  * THIS DOESN'T WORK PROMISES WITH AWAIT MUST BE CONTAINED INSIDE ASYNC FUNCTION.  
  function badFunk() {
    promise = Promise.resolve(1)
    result = await promise
  }
  */