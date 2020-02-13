const Note = require('./mongo-db.js');

module.exports = class Notes {
  constructor(instructions) {
    this.action = instructions.command.action;
    this.payload = instructions.command.payload;
    this.option = instructions.command.option || null;
    this.category = instructions.command.category || null;

  }

  async add(payload, category) {
    //construct and save the payload.
    await new Note({
      text: payload,
      category: category || 'UNCAT',
    }).save();
    return 'Inserted new note sucessfully';
  }

  async list(category) {
    console.log('**** In list():: category:  ' , category)
    let results;
    if (category === true ) {
      results = await Note.find();
    } else {
      results = await Note.find({category: category});
    }
    return this.makeList(results);
  }

  async delete(itemId) {
    const result = await Note.findOneAndDelete({_id: itemId});

    if (result === null) {
      return 'That ID does not exist. Failed to delete.';
    }
    return 'Deleted ' + this.makeList([result]) + 'from database';
  }

  //constructor function to format outgoing data.
  makeList(data) {
    return data.map(note => {
      return {
        id: note.id,
        category: note.category,
        contents: note.text
      }
    })
  }

  execute() {
    switch (this.action) {
      case 'add':
        return this.add(this.payload, this.category);
      case 'delete': 
        return this.delete(this.payload);
      case 'list': 
        return this.list(this.payload);
      default:

        return Promise.resolve();
      //future actions will go here as more cases.
    }
  }
}

