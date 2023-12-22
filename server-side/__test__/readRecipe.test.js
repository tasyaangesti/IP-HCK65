const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token_user;

// beforeAll
beforeAll(async () => {
  try {
    const admin = await User.create({
        email: "serena@mail.com",
        password: "12345",
        fullName: "Serena Woods",
    });

    token_user = signToken({ id: admin.id });

    const articles = require("../data/recipe.json").map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();

      return item;
    });
    await queryInterface.bulkInsert("Recipes", articles);
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

describe("GET /recipe", () => {
  test("Berhasil mendapatkan entitas recipe", async () => {
    try {
      const response = await request(app)
        .get("/recipe")
        .set("Authorization", `Bearer ${token_user}`);
      expect(response.status).toBe(200);
      // console.log(response.body, ">> get recipe");
      expect(Array.isArray(response.body)).toEqual(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
      const response = await request(app).get("/recipe");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
      const response = await request(app)
        .get("/recipe")
        .set("Authorization", "Bearer invalidToken");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
