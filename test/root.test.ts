import * as supertest from "supertest";
const request = supertest("http://localhost:3003");

describe("Root controller", () => {
  test("should return 200 OK", ()=> {
    return request.get("/")
      .expect(200);
  });
});

