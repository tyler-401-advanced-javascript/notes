module.exports =  class Validator {
  constructor(schema) {
    this.schema = schema;
    this.requiredKeysArray = Object.keys(schema).filter(key => schema[key].required === true);
  }

 
  validate(inputObj) {
    try {
      const possibleActions = ['add', 'delete', 'list', 'option', 'update'];
      const inputKeys = Object.keys(inputObj.command);

      //block of bools, each a set in the validation process.
      const correctNumOfKeys = inputKeys.filter(key => this.requiredKeysArray.includes(key)).length === this.requiredKeysArray.length;
      const correctActionName = possibleActions.includes(inputObj.command.action);
      let correctPayload = this.validatePayload(inputObj, inputKeys);

      //handle case when user wants to list ALL entries (and thus does not include a payload.).
      if (inputObj.command.action === 'list' && inputObj.command.payload === true) { correctPayload = true };

      // console.log('****In Validator, all three bools for validation :  ', correctNumOfKeys, correctPayload, correctActionName)
      return correctNumOfKeys && correctPayload && correctActionName;
      
    } catch (err) {
      console.log('In validator: catch error:    ' , err)
      return false;
    }
  }



  validatePayload(inputObj, inputKeys) {
    const format = inputKeys.every(key => {
      return typeof inputObj.command[key] === this.schema[key].type || typeof inputObj.command[key] === this.schema[key].altType;
    })

    const content = inputKeys.every(key => {
      return inputObj.command[key] !== true && inputObj.command[key];
    })

    return format && content;
  }

}