const minimist = require('minimist');

const requiredInputs = {
  action: true
  //more required flags will go here.
}

// this object represents the input from the user.. 
// a parser. 
// get the user input line and slice the first two terms off of it, to expose the options.
function Input(action, payload) {
  //slice up the argvs
  const userArgs = minimist(process.argv.slice(2));
  console.log(userArgs);
  this.action = this.getAction(Object.keys(userArgs)[1]) || action;
  console.log(this.action);
  this.payload = Object.values(userArgs)[1] || payload;

}

//if we have a valid action and the payload has contents, return true;
Input.prototype.verify = function() {

  //for every requiredInput key, check to see if this[that key] is truthy
  let requiredKeys = Object.keys(requiredInputs).filter(key => requiredInputs[key] === true);
  let checkRequired = requiredKeys.map(key => !!this.getAction(this[key]) ? true : false).every(key => key);

  //then check the payload for truthyness, but not true;
  let checkPayload = this.payload === true || !this.payload ? false : true;
  console.log('checkRequired: ', checkRequired, checkPayload, this.payload);

  return checkRequired && checkPayload;
}

Input.prototype.getPayload = function() {
  return this.payload; 
}

Input.prototype.getAction = function(action = '') {
  let regex = /a|add/i;
  if (action) {
    return regex.test(action) ? action : false;
  }
  return false;
}




module.exports = Input