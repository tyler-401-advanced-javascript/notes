

module.exports = class Notes {
  constructor(instructions) {
    this.action = instructions.command.action;
    this.payload = instructions.command.payload;
    console.log
  }

  add(payload) {
    console.log(`Congratulations. Consider yourself a BAMF. '${payload}' is your payload. Have a nice day.`);
  }

  execute() {
    switch (this.action) {
      case 'add':
        this.add(this.payload);
        break;
      default:
        break;
      //future actions will go here as more cases.
    }
  }
}

