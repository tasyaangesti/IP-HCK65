const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3001;
const express = require("express");
const Controller = require("./controllers/controller");
const authentication = require("./middlewares/authentication");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//endpoints
app.post("/login", Controller.Login)
app.post("/register", Controller.Register)

app.use(authentication)
app.get("/recipe", authentication, Controller.findRecipe)
app.get("/recipe/:id", authentication, Controller.findRecipeById)
app.get("/feedback", authentication, Controller.getFeedback)
app.post("/add-feedback", authentication, Controller.postFeedback)
app.post("/transaction-midtrans/:id", authentication, Controller.buyRecipe)
app.delete("/feedback/delete/:id", authentication, Controller.deleteFeedback)
app.get("/feedback/edit/:id", Controller.getFeedbackById)
app.put("/feedback/edit/:id", Controller.editReview)







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
