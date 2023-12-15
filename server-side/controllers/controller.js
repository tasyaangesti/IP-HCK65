const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Recipe, Feedback } = require("../models");
// const axios = require("axios");
const midtransClient = require("midtrans-client");
const SERVER_MIDTRANS = process.env.SERVER_MIDTRANS;

class Controller {
  static async Register(req, res) {
    try {
      const { fullName, email, password } = req.body;

      const newUser = await User.create({ fullName, email, password });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async Login(req, res) {
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
      if (error.hasOwnProperty("code")) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: " Internal Server Error" });
      }
    }
  }

  // static async spooncularGetPopular(req, res) {
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

  static async findRecipe(req, res) {
    try {
      const recipes = await Recipe.findAll();

      res.status(200).json(recipes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findRecipeById(req, res) {
    try {
      console.log(+req.params.id, ">>id ");
      const recipe = await Recipe.findByPk(+req.params.id);
      if (!recipe) {
        throw { code: 404, message: "Not Found" };
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.log(error);
      if (error.hasOwnProperty("code")) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: " Internal Server Error" });
      }
    }
  }

  static async getFeedback(req, res) {
    try {
      const feedback = await Feedback.findAll();

      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: " Internal Server Error" });
    }
  }

  static async postFeedback(req, res) {
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
      res.status(500).json({ message: " Internal Server Error" });
    }
  }

  static async buyRecipe(req, res) {
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
      res.status(500).json({ message: " Internal Server Error" });
    }
  }

  static async editReview(req, res) {
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
      if (error.name === "Not Found") {
        return res.status(404).json({ message: "not found" });
      }
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }

  static async getFeedbackById(req, res) {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
  
      if (!feedback) {
        return res.status(404).json({ message: "Not Found" });
      }
  
      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

  static async deleteFeedback(req, res) {
    try {
      const { id } = req.params;

      await Feedback.destroy({ where: { id: id } });
      res.status(200).json({ message: "Success Delete" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: " Internal Server Error" });
    }
  }
}

module.exports = Controller;
