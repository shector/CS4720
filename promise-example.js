const request = require('request')

var APP = {
  url:  'https://www.cs.virginia.edu/~dgg6b/samples/JSON.txt',
  alternateUrl: 'http://jsonplaceholder.typicode.com/todos/1',
  webResponse: ""
}

options = {json: true}

/** Takes in url, options, and function to return once we're done. This is known as a callback. */
request(APP.alternateUrl, options, (err, res, body) => {
  if (err) console.log('error ' + err)
  APP.webResponse = body
  console.log("got the response \n" + body)
});

//console.log("The request body " + APP.webResponse)

/** We use the promise API to avoid the pyramid of doom. This is where we stack aync calls with a bunch of gross gross nesting 
 *  Promise is an object with two parameters with a resolve and reject function pointers. Resolve is called when it works, reject when it doesn't. 
 *  Promises have two properties a state which tells us whether its running (pending) or has completed sucesfully(fulfilled) or failed (rejected)
 *  and a result which is either a value or an error which is user defined. We basically use a promise to say hey i want something but it'll take some time
 *  to do this. once completed we use a then which has two different paths if our function worked (resolve) or something went bad (reject).
 */
promiseEx = new Promise((resolve, reject) => {
  // Inside function is called executor and is called immediately. 
  setTimeout(() => reject(new Error("oh NOOOOO!")), 500) // pretty similar to throws. 
  setTimeout(() => resolve('done'), 1000)
});

/** Function fired when promise consumes either resolve or reject. First function takes result, 2nd takes error.  */
// promiseEx.then(result => console.log(result), (error) => console.log(error))
promiseEx.then( result => console.log(result).catch(
    error => console.log(error)
  )
)

/** export.js
 * config = {
 *  name: 'My Mobile Application
 * }
 * 
 * import.js
 * import configuration from './export'
 * 
 * This is a default export. We also can have named exports
 * 
 */