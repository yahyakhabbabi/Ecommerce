const jwt = require('jsonwebtoken');
const {JWT_SECRET,Refresh_JWT_SECRET}= require('../config/env');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer')) return res.status(401).send('authHeader not existe');
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        JWT_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).send(err);           
            req.user_name = decoded.username;           
            req.role = decoded.role;
           
            next();
        }
    );
}
const verifyJWTCustomer = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer')) return res.status(401).send('authHeader not existe');
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        JWT_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).send(err);           
            req.customer = decoded;           

            next();
        }
    );
}

const checkRole = (req, res, next) => {
  
    if (req.role !== "Admin") {
        return res.status(403).send('Access denied: Should be an admin');
    }
    next();
}


module.exports = {verifyJWT,checkRole,verifyJWTCustomer};