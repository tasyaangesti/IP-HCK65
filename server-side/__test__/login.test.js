const request = require("supertest");
const { User, sequelize } = require("../models");
const app = require("../app");
const { queryInterface } = sequelize;

const adminFromUser = {
  email: "serema@gmail.com",
  fullName: "Serena Woods",
  password: "12345",
};

beforeAll(async () => {
  try {
    await User.create(adminFromUser);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

describe("POST /login", () => {
  test("Email tidak diberikan / tidak diinput", async () => {
    try {
      const user = {
        email: "",
        password: "12345",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid token"
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Password tidak diberikan / tidak diinput", async () => {
    try {
      const user = {
        email: "serena@mail.com",
        password: "",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Email / password is required"
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Email diberikan invalid / tidak terdaftar", async () => {
    try {
      const user = {
        email: "abc@mail.com",
        password: "tasya12345",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Email / password is required"
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test("Password diberikan salah / tidak match", async () => {
    try {
      const user = {
        email: "serena@gmail.com",
        password: "123456",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  
  

  test("Login berhasil", async () => {
    try {
      const user = {
        email: "serena@gmail.com",
        password: "12345",
      };
      const response = await request(app).post("/login").send(user);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });  
});
