


function Notes(instructions) {
  this.action = instructions.action;
  this.payload = instructions.payload;

  switch (this.action) {
    case 'add':
      this.add(this.payload);
      break;
    default:
      break;
    //future actions will go here as more cases.
  }
}

Notes.prototype.add = function (payload) {
  //send the payload to the database, but for now log it out.
  console.log(payload);
}

module.exports = Notes;