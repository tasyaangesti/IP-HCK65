const app = require("../app");
const request = require("supertest");
const { User, Feedback, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token_user;
let feedbackId;

// beforeAll
beforeAll(async () => {
  try {
    const user = await User.create({
      email: "serena@mail.com",
      password: "12345",
      fullName: "Serena Woods",
    });

    token_user = signToken({ id: user.id });

    const feedback = await Feedback.create({
      review: "lumayan worth it untuk di beli, kurang lengkapp huhu",
      nama: "Serena Woods",
      UserId: "1",
    });
    feedbackId = feedback.id;
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
    await queryInterface.bulkDelete("Feedbacks", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

describe("PUT /feedback/edit/:id", () => {
  test("Berhasil mengupdate data feedback berdasarkan params id yang diberikan", async () => {
    try {
      const newFeedback =
        "lumayan worth it untuk di beli, kurang lengkapp ini wkwkwk";

      const response = await request(app)
        .put(`/feedback/edit/${feedbackId}`)
        .send({
          review: newFeedback,
          nama: "Serena Woods",
          UserId: "1",
        })
        .set("Authorization", `Bearer ${token_user}`);
      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
      const newFeedback =
        "lumayan worth it untuk di beli, kurang lengkapp ini wkwkwk";

      const response = await request(app)
        .put(`/feedback/edit/${feedbackId}`)
        .send({
          review: newFeedback,
          nama: "Serena Woods",
          UserId: "1",
        })
        .set("Authorization", "Bearer invalidToken");
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
      const newFeedback =
        "lumayan worth it untuk di beli, kurang lengkapp ini wkwkwk";

      const response = await request(app)
        .put("/feedback/edit/1")
        .send({
          review: newFeedback,
          nama: "Serena Woods",
          UserId: "1",
        })
        .set("Authorization", "Bearer invalidToken");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    try {
      const newFeedback =
        "lumayan worth it untuk di beli, kurang lengkapp ini wkwkwk";
      const response = await request(app)
        .put(`/feedback/edit/100`)
        .send({
          review: newFeedback,
          nama: "Serena Woods",
          UserId: "1",
        })
        .set("Authorization", `Bearer ${token_user}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal ketika request body yang diberikan tidak sesuai", async () => {
    try {
      const newFeedback =
        "lumayan worth it untuk di beli, kurang lengkapp ini wkwkwk";
      const response = await request(app)
        .put(`/feedback/edit/100`)
        .send({
          review: newFeedback,
          nama: "Serena Woods",
          UserId: "1",
        })
        .set("Authorization", `Bearer ${token_user}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
