module.exports =  class Validator {
  constructor(schema) {
    //construct the behavior of the instance of the validator class..

    /*
    structure of schema object: 
    {
      key1: {type: <string>, required: <bool> }
      key2: {... etc.}
    }
    */

    //create requiredKeys obj with structure: 
    //{ key1: true, key2: true, ... etc }
    this.schema = schema;
    this.requiredKeys = {};

    this.requiredKeysArray = Object.keys(schema).filter(key => schema[key].required === true);
    this.requiredKeysArray.forEach(key => {
       this.requiredKeys[key] = true;
     })
  }

  //input obj format: { action: <string>? payload: <string>?}
  //first, check correct amount and identity of keys, per the required keys.
  //second, check that the format of the payloads are correct
  //third, check that each payload is not ===true and not otherwise falsey.

  validate(inputObj) {
    try {
      const possibleArgs = ['add', 'delete'];
      const inputKeys = Object.keys(inputObj.command);
      console.log('****In Validator, inputObj.command :  ', inputObj.command);
  
      //block of validations, as described above.
      const correctKeys = inputKeys.filter(key => this.requiredKeysArray.includes(key)).length === this.requiredKeysArray.length;
      const correctActionName = possibleArgs.includes(inputObj.command.action);
      const correctPayloadFormat = inputKeys.every(key => {
        return typeof inputObj.command[key] === this.schema[key].type || typeof inputObj.command[key] === this.schema[key].altType;
      })
      const correctPayloadContent = inputKeys.every(key => {
        return inputObj.command[key] !== true && inputObj.command[key];
      })
  
      console.log('****In Validator, all three bools for validation :  ', correctKeys, correctPayloadFormat, correctPayloadContent)
  
      return correctKeys && correctPayloadFormat && correctPayloadContent && correctActionName;
      //returns bool (valid or not valid)
    } catch {
      return false;
    }
  }

}