const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token_user;

// beforeAll
beforeAll(async () => {
  try {
    const user = await User.create({
      email: "serena@mail.com",
      password: "12345",
      fullName: "Serena Woods",
    });

    token_user = signToken({ id: user.id });

    const recipes = require("../data/recipe.json").map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();

      return item;
    });
    await queryInterface.bulkInsert("Recipes", recipes);
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

describe("GET /recipe/:id", () => {
  test("Berhasil mendapatkan 1 detail recipe sesuai dengan params id yang diberikan", async () => {
    try {
      const response = await request(app)
        .get("/recipe/1")
        .send({ UserId: 1 })
        .set("Authorization", `Bearer ${token_user}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toEqual(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
      const response = await request(app)
        .get("/recipe/1")
        .set("Authorization", `Bearer ${token_user}`);

      expect(response.status).toBe(401);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
      const response = await request(app)
        .get("/recipe/1")
        .send({ UserId: 1 })
        .set("Authorization", "Bearer invalidToken");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", async () => {
    try {
      const response = await request(app)
        .get(`/recipe/100`)
        .send({ UserId: 100 })
        .set("Authorization", `Bearer ${token_user}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Not Found");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
