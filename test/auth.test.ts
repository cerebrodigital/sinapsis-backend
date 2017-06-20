import * as supertest from "supertest";
const request = supertest("http://localhost:8000");

describe("GET /", () => {
  it("should return 404 NOT FOUND", (done)=> {
    request.get("/")
      .expect(404, done);
  });
});

