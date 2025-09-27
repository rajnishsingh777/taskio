function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      req.method === 'GET' ? req.query : req.body,
      { abortEarly: false, stripUnknown: true }
    );
    if (error) {
      return res.status(400).json({ message: 'Validation failed', details: error.details });
    }
    if (req.method === 'GET') req.query = value;
    else req.body = value;
    next();
  };
}

module.exports = { validate };



