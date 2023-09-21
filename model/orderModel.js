const mongoose = require('mongoose');
/**
{
	 _id: ObjectId,
	 user : { type: ObjectId, ref: 'User' },
	 books : [{ type: ObjectId, ref: 'Book' }],
	 totalAmount: Number
}
*/
const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    books: [{type: mongoose.Schema.ObjectId, ref: 'Book'}],
    totalAmount: {
        type: Number,
    },
});

// orderSchema.pre(/^find/, function (next) {
//     this.populate('user').populate('books');
//     next();
// });

const Order = mongoose.model('Order', orderSchema);
module.exports = {Order};
