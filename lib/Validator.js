module.exports =  class Validator {
  constructor(schema) {    /*
    structure of schema object: 
    {
      key1: {type: <string>, required: <bool> }
      key2: {... etc.}
    }
    */
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
      const possibleArgs = ['add', 'delete', 'list', 'category'];
      const inputKeys = Object.keys(inputObj.command);
      console.log('****In Validator, inputObj.command :  ', inputObj.command);
  
      //block of bools , as described above.
      const correctKeys = inputKeys.filter(key => this.requiredKeysArray.includes(key)).length === this.requiredKeysArray.length;
      const correctActionName = possibleArgs.includes(inputObj.command.action);
      let correctPayloadFormat = inputKeys.every(key => {
        return typeof inputObj.command[key] === this.schema[key].type || typeof inputObj.command[key] === this.schema[key].altType;
      })
      let correctPayloadContent = inputKeys.every(key => {
        return inputObj.command[key] !== true && inputObj.command[key];
      })

      //handle case when user wants to list ALL entries.
      if (inputObj.command.action === 'list' && inputObj.command.payload === true) {
        correctPayloadFormat = true;
        correctPayloadContent = true;
      }

      console.log('****In Validator, all three bools for validation :  ', correctKeys, correctPayloadFormat, correctPayloadContent, correctActionName)
  
      return correctKeys && correctPayloadFormat && correctPayloadContent && correctActionName;
      
    } catch (err) {
      console.log('In validator: catch error:    ' , err)
      return false;
    }
  }

}