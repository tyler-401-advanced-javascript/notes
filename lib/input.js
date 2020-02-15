

const minimist = require('minimist');


module.exports = class Input{
  constructor() {
    const userArgs = minimist(process.argv.slice(2));
    this.command = this.parseInput(userArgs);
    // console.log('***INPUT constructor:  ', this.command)
  }

  parseInput(args) {
    // console.log('***In parseInput: args: ' , args)
    const possibleRequiredActions = {
      a: 'add',
      add: 'add',
      l: 'list',
      list: 'list',
      d: 'delete',
      delete: 'delete',
      u: 'update',
      update: 'update'
    }

    const possibleOptionalActions = {
      category: 'category',
      c: 'category',
      text: 'text',
      t: 'text'
    }

    //get the first optional and required keys
    const optionalKey = Object.keys(args).find(key => possibleOptionalActions[key]) || false;
    const requiredKey = Object.keys(args).find(key => possibleRequiredActions[key]) || null; 

    const action = possibleRequiredActions[requiredKey] || null;
    const payload = args[requiredKey] || null;

    //build the returnObj
    const returnObj =  (requiredKey !== null && payload !== null) ? { action: action, payload: payload } : false;
  
    // console.log('optional key', optionalKey)
    //if there was an optional key make sure to add it and its payload to the returnObj
    if (optionalKey) {
      returnObj.option = possibleOptionalActions[optionalKey];
      returnObj.optionPayload = args[optionalKey];
    }
    return returnObj;
  }
}


