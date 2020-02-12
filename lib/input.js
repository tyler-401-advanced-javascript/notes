

const minimist = require('minimist');


module.exports = class Input{
  constructor(action, payload) {
    const requiredInputs = {
      action: true,
    }

    const userArgs = minimist(process.argv.slice(2));
    // console.log('****MOCK:   ', userArgs);
    this.command = this.parseInput(userArgs);

  }

  parseInput(args) {
    const possibleActions = {
      a: 'add',
      add: 'add'
    }
    const actionKey = Object.keys(args).find(key => possibleActions[key]) || null;
    const payload = args[actionKey] ? args[actionKey] : null ;
    const action = possibleActions[actionKey] || null;

    // console.log('In input: action, payload: ', action, payload);
    return (actionKey !== null && payload !== null) ? { action, payload } : false;
  }


}


