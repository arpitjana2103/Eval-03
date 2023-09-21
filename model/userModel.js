const mongoose = require('mongoose');

/**
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean
}
*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
    },
    email: {
        type: String,
        required: [true, 'User must have a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'User must have a Password'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = {User};
