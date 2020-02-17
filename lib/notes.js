const Collector = require('./mongo-collections')


module.exports = class Notes {
  constructor(instructions) {
    this.action = instructions.command.action;
    this.payload = instructions.command.payload;
    this.option = instructions.command.option || null;
    this.optionPayload = instructions.command.optionPayload || null;
    this.collector = new Collector();
  }

  async add(payload, category) {
    console.log(payload, category)
    return await this.collector.create(payload, category);
  }

  async list(category) {
    return await this.collector.read(category);
  }

  async delete(itemId) { 
    return await this.collector.delete(itemId);
 }

 async update(itemId, operation, payload) {
   return await this.collector.update(itemId, operation, payload);
 }

  execute() {
    switch (this.action) {
      case 'add':
        return this.add(this.payload, this.optionPayload);
      case 'delete': 
        return this.delete(this.payload);
      case 'list': 
        return this.list(this.payload);
      case 'update':
        return this.update(this.payload, this.option, this.optionPayload);
      default:

        return Promise.resolve();
      //future actions will go here as more cases.
    }
  }
}

