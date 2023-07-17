// import the express-jwt middleware
// this middleware is used to validate JWT tokens in Express applications.
const {expressjwt: jwt} = require('express-jwt');

// instantiate the jwt token validation middleware
const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET, // the secret key that was used to create the JWT tokens.
    algorithms: ['HS256'], // the algorithms that are used to verify the JWT tokens.
    requestProperty: 'payload', // the property in the request object that will store the decoded JWT token.
    getToken: getTokenFromHeaders // a function that is used to extract the JWT token from the request headers.
});

// function passed in the getToken property above
function getTokenFromHeaders(req) {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        return token;
    }

    return null;

    // this function checks if the JWT token is present in the request headers.
    // if it is, the function returns the token.
    // Otherwise, the function returns null.
}

// export the middleware to use it in protected routes
module.exports = {isAuthenticated};