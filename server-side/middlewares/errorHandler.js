module.exports = (error, request, response, next) => {
  console.log(error);
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "Invalid Token":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;

    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message || "Validation error";
      break;

    case "Not Found":
      status = 404;
      message = "Not Found";
      break;

    case "BadRequest":
    case "Unauthorized":
      status = 401;
      message = "Unauthorized";
      break;

    case "Invalid email/password":
    case "Password is required":
    case "Email is required":
      status = 400;
      message = "Invalid email/password" || error.message || "u";
      break;

    case "Email already exists":
      status = 400;
      message = "Email already exists";
      break;
  }
  response.status(status).json({
    message,
  });
};
