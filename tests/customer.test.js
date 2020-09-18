"use strict";

const app = require("../app.js");
const request = require("supertest");
const { Customer } = require("../models");

let customer;

describe("CUSTOMER TEST SUITE", () => {
  beforeAll((done) => {
    Customer.create({
      nama: "nama customer",
      alamat: "jl. Hacktiv no.8",
      telepon: "0812345678",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        customer = res;
        done();
      })
      .catch((err) => console.log(err));
  });

  afterAll((done) => {
    Customer.destroy({
      truncate: true,
      cascade: true,
    })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  //GET ALL CUSTOMER DATA
  describe("GET customers/", () => {
    test("SUCCESS, Get Customers Data", (done) => {
      request(app)
        .get("/customer")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toHaveProperty("id");
          expect(res.body[0]).toHaveProperty("nama", "nama customer");
          expect(res.body[0]).toHaveProperty("alamat", "jl. Hacktiv no.8");
          expect(res.body[0]).toHaveProperty("telepon", "0812345678");
          done();
        });
    });

    test("FAIL, Get Customers Data, (wrong end point)", (done) => {
      request(app)
        .get("/customerx")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  //POST CUSTOMER DATA
  describe("POST customer/", () => {
    test("SUCCESS, Post Customers Data", (done) => {
      request(app)
        .post("/customer")
        .send({
          nama: "nama customer baru",
          alamat: "jl. Hacktiv no.9",
          telepon: "0809123456",
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("nama", "nama customer baru");
          expect(res.body).toHaveProperty("alamat", "jl. Hacktiv no.9");
          expect(res.body).toHaveProperty("telepon", "0809123456");
          done();
        });
    });

    test("FAIL, Post Customers Data (Uncomplete Input Nama)", (done) => {
      request(app)
        .post("/customer")
        .send({
          nama: "",
          alamat: "jl. Hacktiv no.9",
          telepon: "0809123456",
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

    test("FAIL, Post Customers Data (Uncomplete Input Alamat)", (done) => {
      request(app)
        .post("/customer")
        .send({
          nama: "customer",
          alamat: "",
          telepon: "0809123456",
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Alamat is required"
          );
          done();
        });
    });

    test("FAIL, Post Customers Data (Uncomplete Input Telepon)", (done) => {
      request(app)
        .post("/customer")
        .send({
          nama: "customer",
          alamat: "alamat",
          telepon: "",
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
  });

  //GET SPESIFIC CUSTOMER
  describe("GET customer/", () => {
    test("SUCCESS, Get Spesific Customer Data by ID", (done) => {
      request(app)
        .get("/customer/" + customer.id)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id");
          expect(res.body).toHaveProperty("nama", "nama customer");
          expect(res.body).toHaveProperty("alamat", "jl. Hacktiv no.8");
          expect(res.body).toHaveProperty("telepon", "0812345678");
          done();
        });
    });

    test("FAIL, Get Spesific Customer Data by ID", (done) => {
      request(app)
        .get("/customer/" + (customer.id - 1000))
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Data Customer Not Found");
          done();
        });
    });
  });

  //PUT SPESIFIC CUSTOMER
  describe("PUT customer/", () => {
    test("SUCCESS, Put Customers Data", (done) => {
      request(app)
        .put("/customer/" + customer.id)
        .send({
          nama: "nama customer baru lagi",
          alamat: "jl. Hacktiv no.999",
          telepon: "080912999",
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("nama", "nama customer baru lagi");
          expect(res.body).toHaveProperty("alamat", "jl. Hacktiv no.999");
          expect(res.body).toHaveProperty("telepon", "080912999");
          done();
        });
    });

    test("FAIL, Put Customers Data, (Uncomplete Input Nama)", (done) => {
      request(app)
        .put("/customer/" + customer.id)
        .send({
          nama: "",
          alamat: "jl. Hacktiv no.999",
          telepon: "080912999",
        })
        .end((err, res) => {
          if (err) done(err);
          console.log(res.body);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Nama is required"
          );
          done();
        });
    });

    test("FAIL, Put Customers Data, (Uncomplete Input Alamat)", (done) => {
      request(app)
        .put("/customer/" + customer.id)
        .send({
          nama: "nama baru",
          alamat: "",
          telepon: "080912999",
        })
        .end((err, res) => {
          if (err) done(err);
          console.log(res.body);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty(
            "message",
            "Validation error: Alamat is required"
          );
          done();
        });
    });

    test("FAIL, Put Customers Data, (Uncomplete Input Telepon)", (done) => {
      request(app)
        .put("/customer/" + customer.id)
        .send({
          nama: "nama baru",
          alamat: "alamat baru",
          telepon: "",
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
  });

  describe("DEL customer/", () => {
    test("SUCCESS, Del customer data", (done) => {
      request(app)
        .delete("/customer/" + customer.id)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          done();
        });
    });

    test("FAIL, Del customer data", (done) => {
      request(app)
        .delete("/customer/" + (customer.id + 99))
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Customer not found");
          done();
        });
    });
  });
});
