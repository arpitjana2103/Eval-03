const {Order} = require('../model/orderModel');
const {Book} = require('../model/bookModel');

const placeOrder = async function (req, res) {
    try {
        const books = req.body.books;
        let totalAmount = 0;
        await books.forEach(async function (id) {
            const book = await Book.findById(id);
            if (!book) {
                return res.status(400).json({
                    status: 'fail',
                    message: `_id: ${id} book not found in DB`,
                });
            }
            console.log(book.price);
            totalAmount += book.price;
        });

        console.log(totalAmount);
        const order = await Order.create({
            user: req.user._id,
            books: books,
            totalAmount: totalAmount,
        });
        res.status(201).json({
            status: 'success',
            message: 'New Order Placed',
            data: {
                data: order,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getAllOrders = async function (req, res) {
    try {
        const orders = await Order.find().populate('user').populate('books');
        res.status(200).json({
            status: 'success',
            message: 'New Order Placed',
            data: {
                data: orders,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {getAllOrders, placeOrder};
