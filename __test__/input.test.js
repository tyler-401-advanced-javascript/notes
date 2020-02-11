const Input = require('../lib/input.js');



// //for mock inputs... 
// jest.mock('minimist');
// const minimist = require('minimist');

// minimist.mockImplementation(() => {
//   return 'node index.js -b "my Message"';
// });




describe('Test prototypes of Input', () => {
  it('Check getPayload()', () => {
    let input = new Input('a', 'note');
    expect(input.getPayload()).toEqual('note');
  })
  it('Check getAction()', () => {
    let input = new Input('a', 'note');
    expect(input.getAction('a')).toEqual('a');
  })
  it('Check verify() against bad inputs', () => {
    let input = new Input( 'b', 'note');
    expect(input.verify()).toEqual(false);

  })
  it('Check verify() against bad inputs', () => {
    let input = new Input( 'a');
    expect(input.verify()).toEqual(false);
  })
 


})