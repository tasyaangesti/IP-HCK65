const app = require("../app");
const request = require("supertest");
const { User, Recipe, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token_user;
let recipeId;


// beforeAll
beforeAll(async () => {
  try {
    const user = await User.create({
      email: "serena@mail.com",
      password: "12345",
      fullName: "Serena Woods"
    });

    token_user = signToken({ id: user.id });

  } catch (error) {
    console.log(error);
    throw error;
  }
});

// afterAll
afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Recipes", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

describe("DELETE /feedback/delete/:id", () => {
  test("Berhasil menghapus data Feedback berdasarkan params id yang diberikan", async () => {
    try {
      const recipe = await Recipe.destroy( {
        nama: "Serena Woods",
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        UserId: 1
    });

      const response = await request(app)
        .delete(`/feedback/delete/${recipeId}`)
        .send(recipe)
        .set("Authorization", `Bearer ${token_user}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
        const recipe = await Recipe.destroy({
        nama: "Serena Woods",
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        UserId: 1
        });
  
        const response = await request(app)
          .delete(`/recipe/${recipeId}`)
          .send(recipe)
          .set("Authorization", "Bearer invalidToken");
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message")
      } catch (error) {
        console.log(error);
      }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
        const recipe = await Recipe.destroy({
        nama: "Serena Woods",
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        UserId: 1
        });
  
        const response = await request(app)
          .delete(`/recipe/${recipeId}`)
          .send(recipe)
          .set("Authorization", "Bearer invalidToken");
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message")
      } catch (error) {
        console.log(error);
      }
  });

  test("Gagal menjalankan fitur ketika Staff menghapus entity yang bukan miliknya", async () => {
    try {
        const recipe = await Recipe.destroy({
        nama: "Serena Woods",
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        UserId: 1
        });
  
        const response = await request(app)
          .delete(`/recipe/${recipeId}`)
          .send(recipe)
        .set("Authorization", `Bearer ${token_user}`);

          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message")
      } catch (error) {
        console.log(error);
      }
  });

  test("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    try {
        const recipe = await Recipe.destroy({
        nama: "Serena Woods",
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        UserId: 1
        });
  
        const response = await request(app)
          .delete(`/recipe/${recipeId}`)
          .send(recipe)
        .set("Authorization", `Bearer ${token_user}`);

          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message")
      } catch (error) {
        console.log(error);
      }
  });
});
