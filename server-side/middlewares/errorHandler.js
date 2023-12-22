// module.exports = (error, request, response, next) => {
//     console.log(error);
//     let status = error.status || 500;
//     let message = error.message || "Internal Server Error";

//     switch (error.name) {
//       case "InvalidToken":
//       case "JsonWebTokenError":
//         status = 401;
//         message = "InvalidToken";
//         break;

//       case "Forbidden":
//         status = 403;
//         message = "Forbidden";
//         break;

//       case "SequelizeValidationError":
//       case "SequelizeUniqueConstraintError":
//         status = 400;
//         message = error.errors[0].message || "Validation error";
//         break;

//       case "NotFound":
//         status = 404;
//         message = "NotFound";
//         break;

//       case "BadRequest":
//       case "Unauthorized":
//         status = 401;
//         message = "Unauthorized"
//         break;

//       case "Email or password is required":
//       case "Password is required":
//       case "Email is required":
//         status = 400;
//         message = "Email or password is required" || error.message;
//           break;
      
//       case "Email already exists":w
//         status = 400;
//         message = "Email already exists"
//            break;
//     }
//     response.status(status).json({
//       message,
//     });
//   };
