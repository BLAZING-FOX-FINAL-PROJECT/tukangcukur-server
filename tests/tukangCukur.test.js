"use strict"

const app = require("../app.js")
const request = require("supertest")
const { TukangCukur } = require("../models")


let tukangCukur;

describe("TUKANG CUKUR TEST SUITE", () => {
  beforeAll((done) => {
    TukangCukur.create({
      nama: "nama tukang cukur",
      telepon: "0812345678",
      urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
      password: "rahasia",
      rating: 5,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        tukangCukur = res;
        done();
      })
      .catch((err) => console.log(err));
  });

  afterAll((done) => {
    TukangCukur.destroy({
      truncate: true,
      cascade: true,
    })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  //GET ALL TUKANG CUKUR DATA
  describe("GET tukangcukur/", () => {
    test("SUCCESS, Get Tukang Cukur Data", (done) => {
      request(app)
        .get("/tukangcukur")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toHaveProperty("id");
          expect(res.body[0]).toHaveProperty("nama", "nama tukang cukur");
          expect(res.body[0]).toHaveProperty("telepon", "0812345678");
          expect(res.body[0]).toHaveProperty("urlPhoto", "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg");
          expect(res.body[0]).toHaveProperty("rating", 5);
          expect(res.body[0]).toHaveProperty("status", false);
          done();
        });
    });

    test("FAIL, Get Tukang Cukur Data, (wrong end point)", (done) => {
      request(app)
        .get("/tukangcukurx")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  //POST TUKANG CUKUR DATA
  describe("POST tukangcukur/", () => {
    test("SUCCESS, Post Tukang Cukur Data", (done) => {
      request(app)
        .post("/tukangcukur")
        .send({
          nama: "nama tukang cukur baru",
          telepon: "0809123456",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("nama", "nama tukang cukur baru");
          expect(res.body).toHaveProperty("telepon", "0809123456");
          expect(res.body).toHaveProperty("urlPhoto", "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg");
          done();
        });
    });

    test("FAIL, Post Tukang Cukur Data (Uncomplete Input Nama)", (done) => {
      request(app)
        .post("/tukangcukur")
        .send({
          nama: "",
          telepon: "0809123456",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Nama is required"
          );
          done();
        });
    });

    test("FAIL, Post Tukang Cukur Data (Uncomplete Input Telepon)", (done) => {
      request(app)
        .post("/tukangcukur")
        .send({
          nama: "tukangcukur",
          telepon: "",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          rating: 5,
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Telepon is required"
          );
          done();
        });
    });


    test("FAIL, Post Tukang Cukur Data (Uncomplete Input urlPhoto)", (done) => {
      request(app)
        .post("/tukangcukur")
        .send({
          nama: "tukangcukur",
          telepon: "0809123456",
          urlPhoto: "",
          rating: 5,
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Photo is required"
          );
          done();
        });
    });
  });

  //GET SPESIFIC TUKANG CUKUR
  describe("GET tukangcukur/", () => {
    test("SUCCESS, Get Spesific Tukang Cukur Data by ID", (done) => {
      request(app)
        .get("/tukangcukur/" + tukangCukur.id)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id");
          expect(res.body).toHaveProperty("nama", "nama tukang cukur");
          expect(res.body).toHaveProperty("telepon", "0812345678");
          expect(res.body).toHaveProperty("urlPhoto", "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg");
          done();
        });
    });

    test("FAIL, Get Spesific Tukang Cukur Data by ID", (done) => {
      request(app)
        .get("/tukangcukur/" + (tukangCukur.id - 100))
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Data Tukang Cukur Not Found");
          done();
        });
    });
  });

  //PUT SPESIFIC TUKANG CUKUR
  describe("PUT tukangcukur/", () => {
    test("SUCCESS, Put Tukang Cukur Data", (done) => {
      request(app)
        .put("/tukangcukur/" + tukangCukur.id)
        .send({
          nama: "nama tukang cukur baru lagi",
          telepon: "080912999",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          rating: 5,
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("nama", "nama tukang cukur baru lagi");
          expect(res.body).toHaveProperty("telepon", "080912999");
          expect(res.body).toHaveProperty("urlPhoto", "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg");
          expect(res.body).toHaveProperty("rating", 5);
          expect(res.body).toHaveProperty("status", false);
          done();
        });
    });

    test("FAIL, Put Tukang Cukur, (Uncomplete Input Nama)", (done) => {
      request(app)
        .put("/tukangcukur/" + tukangCukur.id)
        .send({
          nama: "",
          telepon: "080912999",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          rating: 5,
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Nama is required"
          );
          done();
        });
    });

    test("FAIL, Put Tukang Cukur Data, (Uncomplete Input Telepon)", (done) => {
      request(app)
        .put("/tukangcukur/" + tukangCukur.id)
        .send({
          nama: "nama baru",
          telepon: "",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          rating: 5,
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Telepon is required"
          );
          done();
        });
    });

    test("FAIL, Put Tukang Cukur Data, (Uncomplete Input UrlPhoto)", (done) => {
      request(app)
        .put("/tukangcukur/" + tukangCukur.id)
        .send({
          nama: "nama baru",
          telepon: "080912999",
          urlPhoto: "",
          rating: 5,
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Photo is required"
          );
          done();
        });
    });
  });

  //PATCH SPESIFIC TUKANG CUKUR
  describe("PATCH tukangcukur/", () => {
    test("SUCCESS, Patch Tukang Cukur Data", (done) => {
      request(app)
        .patch("/tukangcukur/" + tukangCukur.id)
        .send({
          status: true,
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("status", true);
          done();
        });
    });

    test("FAIL, Patch Tukang Cukur, (Uncomplete Input Status)", (done) => {
      request(app)
        .patch("/tukangcukur/" + tukangCukur.id)
        .send({
          status: "",
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });
  })

  //DELETE TUKANG CUKUR
  describe("DEL tukangcukur/", () => {
    test("SUCCESS, Del Tukang Cukur Data", (done) => {
      request(app)
        .delete("/tukangcukur/" + tukangCukur.id)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          done();
        });
    });

    test("FAIL, Del Tukang Cukur Data", (done) => {
      request(app)
        .delete("/tukangcukur/" + (tukangCukur.id + 99))
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Tukang Cukur not found");
          done();
        });
    });
  });

})