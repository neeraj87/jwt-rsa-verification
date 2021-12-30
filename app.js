const fs = require('fs');
const JWT = require('jsonwebtoken');

let privateKey = fs.readFileSync('./private.key', 'utf-8');
let publicKey = fs.readFileSync('./public.key', 'utf-8');

//when the user successfully signs in using his username/password
//the following payload will be created
let payload = {
    id: '12345',
    name: 'John Doe',
    email: 'john@email.com',
    role: 'Admin'
}

let signOptions = {
    issuer: 'AppNameAndOrgName',
    subject: 'org@email.com',
    audience: 'https://org.com',
    expiresIn: '8h',
    algorithm: 'RS256'
}

//create JWT
let token = JWT.sign(payload, privateKey, signOptions);

console.log(`Token: ${token}`);

// JWT VERIFICATION PART
// we will get the jwt in the header of a request from where we extract it
// and verify it using the public key

//make sure the options used for verify call are same as those in the sign call
let verifyOptions = {
    issuer: 'AppNameAndOrgName',
    subject: 'org@email.com',
    audience: 'https://org.com',
    maxAge: '8h',
    algorithms: ['RS256']
}

let isVerified = JWT.verify(token, publicKey, verifyOptions);
console.log(`JWT verified: ${JSON.stringify(isVerified)}`);

//we can also decode the token to extract its information
let decodedToken = JWT.decode(token, {complete: true});
console.log(`Decoded Header: ${JSON.stringify(decodedToken.header)}`);
console.log(`Decoded Payload: ${JSON.stringify(decodedToken.payload)}`);