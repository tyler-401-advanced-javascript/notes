const Note = require('./mongo-db.js');

module.exports = class Collector {

  constructor() {
    
  }

  async create(payload, category) {
      //construct and save the payload.
      const result = await new Note({
        text: payload,
        category: category || 'UNCAT',
      }).save();
      return `Inserted new note ${result._id} successfully.`;
  }

  async read(category) {
    let results;
    if (category === true ) {
      results = await Note.find();
    } else {
      results = await Note.find({category: category});
    }
    return this.makeList(results);
  }

  async update(itemId, operation, payload) {

    //update the note with itemID per operation: payload, OPTIONS: new: true = return the new document.
    const result = await Note.findByIdAndUpdate(itemId, {[operation]: payload}, {new: true})
    return `Updated the ${operation} of note ${result._id} to be:   ${result[operation]}`;
  }

  async delete(itemId) {
    const result = await Note.findOneAndDelete({_id: itemId});
    if (result === null) {
      return 'That ID does not exist. Failed to delete.';
    }
    return `Deleted note ${result._id} successfully.`;
  }

    makeList(data) {
      return data.map(note => {
        return {
          id: note.id,
          category: note.category,
          contents: note.text
        }
      })
     }
}