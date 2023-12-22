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
    await queryInterface.bulkDelete("Receipe", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

describe("POST /recipe", () => {
  test("Berhasil membuat entitas utama", async () => {
    try {
      const data = {
        title: "Fall Classic: Carrot Cake",
        image: "https://spoonacular.com/recipeImages/642551-556x370.jpg",
        ingredients:
          "cooking oil, baking powder, baking soda, cinnamon, all purpose flour, carrot, salt, egg, cream cheese, butter, cream, icing, powdered sugar, vanilla, milk, spread",
        instruction:
          "Preheat oven to 350F (180C) and grease two 9 (23cm) cake pans. Beat oil and sugars together in a large bowl until combined. Add eggs, one at a time, beating well after each addition. Next, combine flour, cinnamon, baking soda, baking powder and salt.",
        CategoryId: 1,
        status: "unavailable",
      };

      const response = await request(app)
        .post("/recipe")
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      expect(response.status).toBe(201);
      //   console.log(response.status, "res nie");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("image");
      expect(response.body).toHaveProperty("ingredients");
      expect(response.body).toHaveProperty("CategoryId");
      expect(response.body).toHaveProperty("status");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
      const data = {
        title: "Fall Classic: Carrot Cake",
        image: "https://spoonacular.com/recipeImages/642551-556x370.jpg",
        ingredients:
          "cooking oil, baking powder, baking soda, cinnamon, all purpose flour, carrot, salt, egg, cream cheese, butter, cream, icing, powdered sugar, vanilla, milk, spread",
        instruction:
          "Preheat oven to 350F (180C) and grease two 9 (23cm) cake pans. Beat oil and sugars together in a large bowl until combined. Add eggs, one at a time, beating well after each addition. Next, combine flour, cinnamon, baking soda, baking powder and salt.",
        CategoryId: 1,
        status: "unavailable",
      };

      const response = await request(app).post("/recipe").send(data);

      expect(response.status).toBe(401);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
      const data = {
        title: "Fall Classic: Carrot Cake",
        image: "https://spoonacular.com/recipeImages/642551-556x370.jpg",
        ingredients:
          "cooking oil, baking powder, baking soda, cinnamon, all purpose flour, carrot, salt, egg, cream cheese, butter, cream, icing, powdered sugar, vanilla, milk, spread",
        instruction:
          "Preheat oven to 350F (180C) and grease two 9 (23cm) cake pans. Beat oil and sugars together in a large bowl until combined. Add eggs, one at a time, beating well after each addition. Next, combine flour, cinnamon, baking soda, baking powder and salt.",
        CategoryId: 1,
        status: "unavailable",
      };

      const response = await request(app)
        .post("/recipe")
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
      const data = {};

      const response = await request(app)
        .post("/recipe")
        .set("Authorization", `Bearer ${token}`)
        .send(data);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Title is required");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
