const mongoose = require('mongoose')
const { Schema } = mongoose;

const messageSchema = new Schema({
    user: {
      email: String,
      firstName: String,
      lastName: String,
    },
    message: String
},
    {
        collection: 'Messages'
    });

module.exports = mongoose.model('Messages', messageSchema)