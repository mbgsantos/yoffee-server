const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// set the number of rounds used to hash the password.
// the higher the number of rounds, the more secure the hash will be.
const saltRounds = 10;

// Signup
router.post('/signup', async (req, res, next) => {
    const {email, password, name} = req.body;

    try {
        // checks if all parameters have been provided
        if (email === '' || password === '' || name === '') {
            return res.status(400).json({message: 'All fields are mandatory'});
        }

        // use regex to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: 'Provide a valid email address'});
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        if(!passwordRegex.test(password)) {
            return res.status(400).json({message: 'Password must have at least 6 characters and contain one number, one lowercase and one uppercase letter'});
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'The provided email is already registered'});
        }

        // encrypt the password using bcrypt.hashSync() method
        // the encrypted password is stored in the password field of the User model.
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // create the user
        const newUser = await User.create({
            email,
            name,
            password: hashedPassword
        });

        // return the user's email, name, and _id.
        res.json({email: newUser.email, name: newUser.name, _id: newUser._id});
    } catch (error) {
        console.log('An error occurred creating the user', error);
        next(error);
    }
});

// Login
router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if (email === '' || password === '') {
            return res.status(400).json({message: 'All fields are mandatory'});
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'Provided email is not registered'});
        }

        // check if password is correct
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (isPasswordCorrect) {
            // if the password is correct, we create a JWT payload
            // the payload includes the user's _id, email, and name.
            // DON'T SEND THE PASSWORD
            const payload = {_id: user._id, email: user.email, name: user.name};

            // create and sign the JWT
            // we pass the user payload and the token secret defined in .env
            // the JWT is signed using the jwt.sign() method.
            // the signed JWT is returned to the client.
            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: 'HS256', // the algorithm to encrypt the token, default is HS256
                expiresIn: '6h' // TTL: Time to live of the JWT
            });

            // send the JWT as response
            res.json({authToken});
        } else {
            res.status(400).json({message: 'Incorrect password'});
        }
    } catch (error) {
        console.log('An error occurred login in the user', error);
        next(error);
    }
});

// Verify - used to check if the JWT stored on the client is valid
router.get('/verify', isAuthenticated, (req, res, next) => {
    // if the JWT is valid, it gets decoded and made available in req.payload
    console.log('req.payload', req.payload);

    res.json(req.payload);
});

module.exports = router;