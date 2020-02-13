const Input = require('./lib/Input.js');
const Notes = require('./lib/Notes.js');
const Validator = require('./lib/Validator.js');
const mongoose = require('mongoose');

//mongoose db urI
const MONGOOSE_URI = 'mongodb://localhost:27017/notes';
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(MONGOOSE_URI, mongooseOptions);


//create a new instance of function Input, which is full of all of the user's args.
const validNoteSchema = {
  action: { type: 'string', required: true },
  payload: { type: 'string', altType: 'number', required: true },
  option: { type: 'string'},
  category: { type: 'string'}
}


//create 
const input = new Input();
console.log('****In index: input: ', input)
const noteValidator = new Validator(validNoteSchema);


//check if the options are valid.. If they are not valid, fire the error handler.. (get help);
if (noteValidator.validate(input)) {
  new Notes(input).execute()
    .then((results) => {
      console.log(results);
      mongoose.disconnect();
    })

} else {
  console.log('Get halp......')
  getHelp();
}






function getHelp() {
  console.error('Invalid Input... check your options... Get help from your administrator....')
  process.exit();
}
    