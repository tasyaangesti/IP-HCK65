function errorHandler(error, req, res, next) {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (key) {
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;

    case "Not Found":
      status = 404;
      message = "Not Found";
      break;

    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;

    case "BadRequest":
      status = 400;
      message = "Bad Request";
      break;

    case "Invalid email/password":
      status = 400;
      message = "Invalid email/password";
      break;

    case "Email is required":
      status = 400;
      message = "Email is required";
      break;

    case "Password is required":
      status = 400;
      message = "Password is required";
      break;

    default:
      break;
  }
}
