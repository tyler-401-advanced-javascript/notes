const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

//create a new instance of function Input, which is full of all of the user's args.
const input = new Input();

//check if the options are valid.. If they are not valid, fire the error handler.. (get help);
const valid = input.verify() ? true : getHelp();
if (valid) {
  
  console.log('Success');
  //we dont use it yet, but this makes a new
  let myNote = new Notes(input);

}


function getHelp() {
  console.error('Invalid Input... check your options... Get help from your administrator....')
  return false;
}
    