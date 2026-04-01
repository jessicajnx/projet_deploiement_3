const request = require("supertest");
const app = require("../../src/app");

describe("API e2e", () => {
  test("GET /health returns service status", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("projet_deploiement_3");
  });

  test("GET /api/greet returns business response", async () => {
    const res = await request(app).get("/api/greet").query({ name: "Jess" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Bonjour Jess");
  });
});
