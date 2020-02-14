const Input = require('../lib/Input.js');
const Notes = require('../lib/Notes.js');
const Validator = require('../lib/Validator.js');


//todo: what is happening here? 
jest.mock('minimist');
const minimist = require('minimist');


//watch the console.log()
jest.spyOn(global.console, 'log');


//set up a mock implementation, 
//this will mock the minimist function. Whenever minimist is called, the return value of this callback will be injected and returned in place of whatever minimist was going to return. It's an override.

//todo: how does this not fail? 
minimist.mockImplementation(() => {
  return {
    a: 'spicy beverage'
  }
})


describe('notes modules', () => {
  it('execute does nothing when the options are invalid', () => {
    const command = { 'command': { 'x': 'coconut'} };
    const note = new Notes(command);
    expect(console.log()).not.toHaveBeenCalled;
  })

  it('notes.prototype.add() can add a note', () => {
    const action = 'add';
    const payload = 'lacroix';
    const notes = new Notes({command: {action, payload}});
    notes.execute();
    expect(console.log).toHaveBeenCalled;
  })

  it('Notes can add a note: ', () => {
    const query = {
      action: 'add',
      payload: 'Walk dog',
      category: 'Chores'
    }
    const notes = new Notes({command: query})
    jest.spyOn(notes, 'add');
    notes.execute()
      .then( expect(notes.add).toHaveBeenCalledWith(query.payload, query.category) );
  })
})





describe('Test prototypes of Input', () => {
  it('Check parseInput() for positive', () => {
    let input = new Input();
    expect(input.parseInput({a: 'spicy'})).toEqual({'action': 'add', 'payload': 'spicy'});
    expect(input.parseInput({a: '23232424'})).toEqual({'action': 'add', 'payload': '23232424'});
    expect(input.parseInput({a: 1234})).toEqual({'action': 'add', 'payload': 1234});
  })
  
  it('Check parseInput() to reject badly formatted input', () => {
    let input = new Input();
    expect(input.parseInput({x: 'spicy'})).toEqual(false);
    expect(input.parseInput({a: ''})).toEqual(false);
    expect(input.parseInput('spicy')).toEqual(false);
  })
  
  it('Complete runthrough with positive input', () => {
    const input = new Input();
    const notes = new Notes(input)
    notes.execute()
    expect(console.log).toHaveBeenCalledWith(`Congratulations. Consider yourself a BAMF. 'spicy beverage' is your payload. Have a nice day.`);
  })


  describe('Test Validator class and prototypes', () => {
    it('test validate for positive inputs', () => {
      const schema = {
        action: { type: 'string', required: true },
        payload: { type: 'string', altType: 'number', required: true }
      }
      const validator = new Validator(schema);
      expect(validator.validate({command: {action: 'add', payload: 'meatballs'}})).toEqual(true);
    })
    it('validate should reject a number of bad inputs.', () => {
      const schema = {
        action: { type: 'string', required: true },
        payload: { type: 'string', altType: 'number', required: true }
      }
      const validator = new Validator(schema);
      expect(validator.validate({command: {action: 'add', payload: ''}})).toEqual(false);
      expect(validator.validate({command: {ation: 'add', payload: 'meatballs'}})).toEqual(false)
      expect(validator.validate({command: {action: '', payload: 'meatballs'}})).toEqual(false)
      expect(validator.validate({command: {action: 'a', payload: 'meatballs'}})).toEqual(false)
      expect(validator.validate({command: {action: 'add', actionaaa: 'add', payload: 'meatballs'}})).toEqual(false)
    })
    
    it('test validate for positive inputs', () => {
      const schema = {
        action: { type: 'string', required: true },
        payload: { type: 'string', altType: 'number', required: true }
      }
      const validator = new Validator(schema);
      expect(validator.validate({command: {action: 'add', payload: 'meatballs'}})).toEqual(true);
      expect(validator.validate({command: {action: 'add', payload: '982374mdn.``;fdfjhs'}})).toEqual(true);
      expect(validator.validate({command: {action: 'add', payload: 123444}})).toEqual(true);
    })
  })


})