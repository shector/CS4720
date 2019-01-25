/**
╔╦╗┌─┐┌┐ ┬┬  ┌─┐  ╔╦╗┌─┐┬  ┬┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐┌┐┌┌┬┐  ╦═╗┌─┐┌─┐┌─┐┌┬┐
║║║│ │├┴┐││  ├┤    ║║├┤ └┐┌┘├┤ │  │ │├─┘│││├┤ │││ │   ╠╦╝├┤ ├─┤│   │ 
╩ ╩└─┘└─┘┴┴─┘└─┘  ═╩╝└─┘ └┘ └─┘┴─┘└─┘┴  ┴ ┴└─┘┘└┘ ┴   ╩╚═└─┘┴ ┴└─┘ ┴ 
╔═╗┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐  ╔═╗  ╔╗ ┬ ┬┌─┐  ╦ ╦┬ ┬┌┐┌┌┬┐                   
╠═╝├┬┘│ │ │├┤ │   │   ║ ║  ╠╩╗│ ││ ┬  ╠═╣│ ││││ │                    
╩  ┴└─└─┘└┘└─┘└─┘ ┴   ╚═╝  ╚═╝└─┘└─┘  ╩ ╩└─┘┘└┘ ┴                    

 * The program below contains 7 bugs. Follow the instructions in the md/pdf
 * filebto setup your environment. Once you have completed setting up your
 * environment. Fix all 7 bugs in the program below. 
 * 
 * How will need to remember the line numbers that you changed
 * Because this is what you will submit. 
 * 
 * This program is not designed to be optimial it designed to 
 * demostrate the concepts from lecture
 * 
 * Remember to install the request module
 * npm install request@2.x.x
 * 
 */

 var APP = {
     version: '0.0.1',
     author:'Selwyn Hector (snh3fa)',
     url: 'http://www.cs.virginia.edu/~dgg6b/encoded.html'
 }


 class Networking{

    /**
     * 
     * @param {*} url specifys the url to retreive the object
     * returns the object that was fetched. 
     * 
     */
    constructor(){
        APP.Networking = this 
    }
 }


 class Cloner extends Networking{
    /**
     * 
     * @param {*} encodedObject 
     * convernts the based 64 object to 
     */
    constructor(responseText){
        //Hint the line below is missing something :) 
        super() // !! EDITED LINE !!
        this.obj = JSON.parse(Buffer.from(responseText, 'base64').toString()) //!! EDITED LINE !!
    }


    deepClone(obj){
        let clone = {}
        let prop = null
        for(prop in obj){
            if(typeof obj[prop] == 'object' & Object.keys(obj).length === 0){  // !! EDITED LINE
                clone[prop] = this.deepClone(obj[prop]) // !! EDITED LINE !!
            }else{
                clone[prop] = obj[prop] // !! EDITED LINE !!
            }
        }
        return clone
    }


    sameNames(){
        return this.obj.name === this.obj.friends.name // !! EDITED LINE !!
    }
 }


    const request = require('request')
    console.log(APP.url)
    request(APP.url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err) }
        cloningClass = new Cloner(body) 
        cloned = cloningClass.deepClone(cloningClass.obj) // !! EDITED LINE !!
        console.log(cloningClass.sameNames())
        console.log(JSON.stringify(cloned, null, 2)) 

    });

/** Your programs output should look like this. 
 * 
 * false 
 * {
    grit: '9.0', 
    name: '', 
    friends: {
        name: 0, 
        age: '22', 
    },
    family: null,
}
 * 
 */

