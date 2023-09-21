const express = require('express');

const authController = require('../controllers/authController');
const booksController = require('../controllers/booksController');
const orderController = require('../controllers/orderController');

const apiRouter = express.Router();

apiRouter.route('/register').post(authController.register);
apiRouter.route('/login').post(authController.login);
apiRouter.route('/books').get(booksController.getAllBooks);
apiRouter.route('/books/:id').get(booksController.getOneBook);

apiRouter
    .route('/books')
    .post(
        authController.protect,
        authController.restrictedTo('admin'),
        booksController.addBook
    );

apiRouter
    .route('/books/:id')
    .patch(
        authController.protect,
        authController.restrictedTo('admin'),
        booksController.updateBook
    )
    .put(
        authController.protect,
        authController.restrictedTo('admin'),
        booksController.updateBook
    );

apiRouter
    .route('/books/:id')
    .delete(
        authController.protect,
        authController.restrictedTo('admin'),
        booksController.deleteBook
    );

apiRouter
    .route('/order')
    .post(
        authController.protect,
        authController.restrictedTo('customer'),
        orderController.placeOrder
    );

apiRouter
    .route('/orders')
    .get(
        authController.protect,
        authController.restrictedTo('admin'),
        orderController.getAllOrders
    );

module.exports = {apiRouter};
