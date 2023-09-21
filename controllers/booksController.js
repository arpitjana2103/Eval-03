const {Book} = require('../model/bookModel');

const getAllBooks = async function (req, res) {
    try {
        const books = await Book.find(req.query);
        res.status(200).json({
            status: 'success',
            data: {
                data: books,
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

const getOneBook = async function (req, res) {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json({
            status: 'success',
            data: {
                data: book,
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

const addBook = async function (req, res) {
    try {
        const newBook = await Book.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                data: newBook,
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

const updateBook = async function (req, res) {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                data: book,
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

const deleteBook = async function (req, res) {
    try {
        const id = req.params.id;
        await Book.findByIdAndDelete(id);
        res.status(202).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {getAllBooks, getOneBook, addBook, updateBook, deleteBook};
