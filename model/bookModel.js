const mongoose = require('mongoose');
/**
{
  _id: ObjectId,
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number
}
*/

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book must have a title'],
    },
    author: {
        type: String,
        required: [true, 'A book must have a author'],
    },
    category: {
        type: String,
        required: [true, 'A book must have a category'],
    },
    price: {
        type: Number,
        required: [true, 'A book must have a price'],
    },
    quantity: {
        type: Number,
        required: [true, 'A book must have a quantity'],
    },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = {Book};
