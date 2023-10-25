const jwt = require("jsonwebtoken");
const { JWT_SECRET, Refresh_JWT_SECRET } = require("../config/env");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).send("authHeader not existe");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send(err);
    console.log(decoded);
    if (decoded.type === "user") {
      req.user_name = decoded.username;
      req.role = decoded.role;
    } else {
      req.customer = decoded;
    }

    next();
  });
};
// const verifyJWTCustomer = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader?.startsWith('Bearer')) return res.status(401).send('authHeader not existe');
//     const token = authHeader.split(' ')[1];
//     jwt.verify(
//         token,
//         JWT_SECRET,
//         (err, decoded) => {
//             if (err) return res.status(403).send(err);
//             req.customer = decoded;

//             next();
//         }
//     );
// }

const isAdmin = (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).send("Access denied: Should be an admin");
  }
  next();
};
const isAdminOrManager = (req, res, next) => {
  const role = req.role;
  if (role !== "Admin" && role !== "Manager") {
    return res.status(403).send("Access denied: Should be an admin or manager");
  }

  next();
};

module.exports = { verifyJWT, isAdmin, isAdminOrManager };
