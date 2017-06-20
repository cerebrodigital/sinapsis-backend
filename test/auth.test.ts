import * as supertest from "supertest";
const request = supertest("http://localhost:3003");

describe("GET /", () => {
  it("should return 404 NOT FOUND", ()=> {
    return request.get("/auth")
      .expect(404);
  });
});

