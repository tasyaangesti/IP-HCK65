const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Recipe, Feedback } = require("../models");
// const axios = require("axios");
const midtransClient = require("midtrans-client");
const SERVER_MIDTRANS = process.env.SERVER_MIDTRANS;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();


class Controller {
  static async Register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;

      const newUser = await User.create({ fullName, email, password });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      console.log(error);
      // if (
      //   error.name === "SequelizeUniqueConstraintError" ||
      //   error.name === "SequelizeValidationError"
      // ) {
      //   res.status(400).json({ message: error.errors[0].message });
      // } else {
      //   res.status(500).json({ message: "Internal Server Error" });
      // }
      next();
    }
  }

  static async Login(req, res, next) {
    try {
      const { fullName, email, password } = req.body;

      if (!email) {
        throw { code: 400, message: "Email is required" };
      } else if (!password) {
        throw { code: 400, message: "Password is required" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { code: 401, message: "Invalid email/password" };
      }

      const isPasswordSame = comparePassword(password, user.password);
      if (!isPasswordSame) {
        throw { code: 401, message: "Invalid email/password" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      // if (error.hasOwnProperty("code")) {
      //   res.status(error.code).json({ message: error.message });
      // } else {
      //   res.status(500).json({ message: " Internal Server Error" });
      // }
      next();
    }
  }

  // static async spooncularGetPopular(req, res, next) {
  //   try {
  //     const { data } = await axios({
  //       method: "get",
  //       url: `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_SPOONCULAR}&number=9`,
  //     });
  //     // console.log(data, "data");
  //     res.status(201).json({ data });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }

  static async findRecipe(req, res, next) {
    try {
      const recipes = await Recipe.findAll();
      console.log(recipes, ">>rec");

      res.status(200).json(recipes);
    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: "Internal Server Error" });
      next();
    }
  }

  static async findRecipeById(req, res, next) {
    try {
      console.log(+req.params.id, ">>id ");
      const recipe = await Recipe.findByPk(+req.params.id);
      if (!recipe) {
        throw { code: 404, message: "Not Found" };
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.log(error);
      // if (error.hasOwnProperty("code")) {
      //   res.status(error.code).json({ message: error.message });
      // } else {
      //   res.status(500).json({ message: " Internal Server Error" });
      // }
      next();
    }
  }

  static async getFeedback(req, res, next) {
    try {
      const feedback = await Feedback.findAll();

      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: " Internal Server Error" });
    }
  }

  static async postFeedback(req, res, next) {
    try {
      const { review, nama, UserId } = req.body;

      const createFeedback = await Feedback.create({
        review,
        nama,
        UserId,
      });
      res.status(201).json(createFeedback);
    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: " Internal Server Error" });
      next();
    }
  }

  static async buyRecipe(req, res, next) {
    try {
      console.log(req.user.id);
      let user = await User.findByPk(req.user.id);
      console.log(user, "user buy");
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: SERVER_MIDTRANS,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDERID-" + Math.floor(100000000 + Math.random() * 9000000),
          gross_amount: 30000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: " Internal Server Error" });
      next();
    }
  }

  static async editReview(req, res, next) {
    try {
      const { review, nama, UserId } = req.body;
      let findFeedback = await Feedback.findByPk(req.params.id);
      if (!findFeedback) {
        throw {
          name: "Not Found",
        };
      }

      await Feedback.update(
        { review, nama, UserId },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        message: `feedback has been updated`,
      });
    } catch (error) {
      // if (error.name === "Not Found") {
      //   return res.status(404).json({ message: "not found" });
      // }
      // if (error.name === "SequelizeValidationError") {
      //   return res.status(400).json({ message: error.errors[0].message });
      // }
      // console.log(error);
      // res.status(500).json({
      //   message: "internal server error",
      // });
      next();
    }
  }

  static async putStatus(req, res, next) {
    try {
      let findStatus = await Recipe.findByPk(req.params.id);
      if (!findStatus) {
        throw {
          name: "Not Found",
        };
      }

      await Recipe.update(
        { status: "available" },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        message: `status has been updated`,
      });
    } catch (error) {
      console.log(error);
      // res.status(500).json({
      //   message: "internal server error",
      // });
      next();
    }
  }

  static async getFeedbackById(req, res, next) {
    try {
      const feedback = await Feedback.findByPk(req.params.id);

      if (!feedback) {
        return res.status(404).json({ message: "Not Found" });
      }

      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      // return res.status(500).json({ message: "Internal Server Error" });
      next();
    }
  }

  static async deleteFeedback(req, res, next) {
    try {
      const { id } = req.params;

      await Feedback.destroy({ where: { id: id } });
      res.status(200).json({ message: "Success Delete" });
    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: " Internal Server Error" });
      next();
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      console.log(req.headers.google_token, "google server");
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.google_client,
      });

      const payload = ticket.getPayload();
      console.log(payload, "ini payload google");

      const findUser = await User.findOne({ where: { email: payload.email } });
      if (!findUser) {
        const user = await User.create({
          email: payload.email,
          fullName: payload.name,
          password: String(Math.random()),
        });
      }

      console.log(findUser, "ini user di goole login");
      const access_token = signToken({ id: findUser.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      // res.status(500).json({
      //   message: "internal server error",
      // });
      next();
    }
  }
}

module.exports = Controller;
