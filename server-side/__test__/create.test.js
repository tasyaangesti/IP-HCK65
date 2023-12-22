const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token;

beforeAll(async () => {
  try {
    const user = await User.create({
      fullName: "Serena Woods",
      email: "serena@mail.com",
      password: "12345",
    });

    token = signToken({ id: user.id });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Feedback", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

describe("POST /add-feedback", () => {
  test("Berhasil membuat entitas utama", async () => {
    try {
      const data = {
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        nama: "Serena Woods",
        UserId: "1",
      };

      const response = await request(app)
        .post("/add-feedback")
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      expect(response.status).toBe(201);
      // console.log(response.status, "res nie");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("review");
      expect(response.body).toHaveProperty("nama");
      expect(response.body).toHaveProperty("UserId");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
      const data = {
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        nama: "Serena Woods",
        UserId: "1",
      };

      const response = await request(app).post("/add-feedback").send(data);

      expect(response.status).toBe(401);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
      const data = {
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        nama: "Serena Woods",
        UserId: "1",
      };

      const response = await request(app)
        .post("/add-feedback")
        .set("Authorization", "Bearer invalidToken")
        .send(data);

      expect(response.status).toBe(401);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal ketika request body tidak sesuai (validation required)", async () => {
    try {
      const data = {
        review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
        nama: "Serena Woods",
        UserId: "1",
      };

      const response = await request(app)
        .post("/add-feedback")
        .set("Authorization", `Bearer ${token}`)
        .send(data);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Review is required");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
