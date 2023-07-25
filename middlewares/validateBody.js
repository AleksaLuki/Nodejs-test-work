const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;




// const { HttpError } = require("../helpers");

// const validateBody = (schema) => {
//   const func = (req, res, next) => {
//     if (!req.body || !req.body.name) {
//       return next(HttpError(400, "Field 'name' is required"));
//     }

//     const { error } = schema.validate(req.body);
//     if (error) {
//       return next(HttpError(400, error.message));
//     }
    
//     next();
//   };

//   return func;
// };

// module.exports = validateBody;