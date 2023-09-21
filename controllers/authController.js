const {User} = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async function (req, res) {
    try {
        const password = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
            isAdmin: req.body.isAdmin,
        });

        // const token = jwt.sign({id: newUser._id}, 'masai');
        // newUser.password = undefined;
        res.status(201).json({
            status: 'Success',
            message: 'New User Created',
            // token: token,
            data: {
                data: newUser,
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

const login = async function (req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            throw new Error('Please provide email and password for login');
        }

        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('User not Found, Please Register');
        }
        const token = jwt.sign({id: user._id}, 'masai');
        res.status(201).json({
            status: 'Success',
            message: 'Login Successfull',
            token: token,
            data: {
                data: user,
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

const protect = async function (req, res, next) {
    try {
        let token = null;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new Error('Token Not found, Login to get token');
        }

        const decoded = jwt.verify(token, 'masai');
        const currUser = await User.findById(decoded.id);
        if (!currUser) {
            throw new Error('Invalid Token');
        }
        req.user = currUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const restrictedTo = function (role) {
    return function (req, res, next) {
        try {
            if (role === 'admin') {
                if (req.user.isAdmin) {
                    return next();
                } else {
                    throw new Error('This Operation is Restricted to ADMIN');
                }
            } else if (role === 'customer') {
                if (!req.user.isAdmin) {
                    return next();
                } else {
                    throw new Error('This Operation is Restricted to CUSTOMER');
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: 'fail',
                error: error.message,
            });
        }
    };
};

module.exports = {login, register, protect, restrictedTo};
