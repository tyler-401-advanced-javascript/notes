const mongoose = require('mongoose');


const schema = {
    text: { required: true, type: 'String' },
    category: { required: true, type: 'String', enum: ['NOTE', 'UNCAT', 'TOAST'] }
  }

 const model = mongoose.model('note', schema);


module.exports = model;