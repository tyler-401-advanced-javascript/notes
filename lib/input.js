

const minimist = require('minimist');


module.exports = class Input{
  constructor() {

    const userArgs = minimist(process.argv.slice(2));
    // console.log('****MOCK:   ', userArgs);
    this.command = this.parseInput(userArgs);
    console.log('***INPUT constructor:  ', this.command)
  }

  parseInput(args) {
    console.log('***In parseInput: args: ' , args)
    const possibleRequiredActions = {
      a: 'add',
      add: 'add',
      l: 'list',
      list: 'list',
      d: 'delete',
      delete: 'delete',
    }

    const optionalActions = {
      category: 'category',
      c: 'category'
    }

    //get first optional key
    const optionalKey = Object.keys(args).find(key => optionalActions[key])

    //get required key
    const actionKey = Object.keys(args).find(key => possibleRequiredActions[key]) || null; 
    console.log('****In Input:   actionKeys : ' , actionKey)

    const payload = args[actionKey] ? args[actionKey] : null;
    const action = possibleRequiredActions[actionKey] || null;

    // console.log('In input: action, payload: ', action, payload);
    const returnObj =  (actionKey !== null && payload !== null) ? { action: action, payload: payload } : false;
    
    //if there was an optional key make sure to add it to the returnObj
    if (optionalKey && possibleRequiredActions[actionKey] === 'add') {
      returnObj.option = optionalActions[optionalKey];
      returnObj.category = args[optionalKey];
    }

    return returnObj;
  }
}


