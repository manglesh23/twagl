const mongoose = require('mongoose');

/*--------------------------------------------------------------*/
/*-------------Class model with---------------------------------*/
/*--------------------------------------------------------------*/

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  bookings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  waitlist: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  startTime: {
    type: Date,
    required: true,
  },
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
