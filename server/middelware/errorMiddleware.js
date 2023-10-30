const errorhandling = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "internal server erreur";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
};

module.exports = { errorhandling };
