"use strict";

const app = require("../app.js");
const request = require("supertest");
const userToken = require('../helpers/jwt')
const { Customer, TukangCukur, Varian } = require("../models");
const jwt = require('jsonwebtoken')
const seed = require('../seeds/varianseed')

let access_token_customer;
let access_token_tukangCukur;

describe("MAIN APP TOKEN VERIVIER TEST SUITE", () => {
  beforeAll((done) => {
    Customer.create({
      nama: "nama customer",
      alamat: "jl. Hacktiv no.8",
      telepon: "0812345678",
      password: "rahasia",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        access_token_customer = userToken({id: res.id, role: 'customer'});
        return TukangCukur.create({
          nama: "nama tukang cukur",
          telepon: "0812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          rating: 5,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        access_token_tukangCukur = userToken({id: res.id, role: 'tukangcukur'});
        done();
      })
      .catch((err) => console.log(err));
  });

  afterAll((done) => {
    Customer.destroy({
      truncate: true,
      cascade: true,
    })
      .then((res) => {return
        TukangCukur.destroy({
          truncate: true,
          cascade: true,
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("GET verify/", () => {
    test("SUCCESS, Decrypted Customer Role", (done) => {
      request(app)
        .get("/verify")
        .set({"access_token": access_token_customer})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id", jwt.verify(access_token_customer, process.env.JWT_SECRET).id);
          expect(res.body).toHaveProperty("role", "customer");
          done();
        });
    });

    test("SUCCESS, Decrypted tukangCukur Role", (done) => {
      request(app)
        .get("/verify")
        .set({"access_token": access_token_tukangCukur})
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id", jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id);
          expect(res.body).toHaveProperty("role", "tukangcukur");
          done();
        });
    });

    test("FAIL, Access Token not present", (done) => {
      request(app)
        .get("/verify")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Invalid Token!");
          done();
        });
    });

    test("FAIL, Access Token Invalid", (done) => {
      request(app)
        .get("/verify")
        .set({"access_token": "access_token_customer"})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Invalid Token!");
          done();
        });
    });

    test("FAIL, Invalid Role", (done) => {
      request(app)
        .get("/verify")
        .set({"access_token": userToken({id: 3, role: 'helper'})})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Unidentifed Role!");
          done();
        });
    });

  });

})

describe("VARIAN TEST SUITE", () => {
  beforeAll((done) => {
    Customer.create({
      nama: "nama customer",
      alamat: "jl. Hacktiv no.8",
      telepon: "0812345678",
      password: "rahasia",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        access_token_customer = userToken({id: res.id, role: 'customer'});
        return Varian.bulkCreate(seed)
      })
      .then(_ => done())
      .catch((err) => console.log(err));
  });

  afterAll((done) => {
    Customer.destroy({
      truncate: true,
      cascade: true,
    })
      .then((res) => {return
        Varian.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("GET varian/", () => {
    test("SUCCESS, Get all variant menu", (done) => {
      request(app)
        .get("/varian")
        .set({"access_token": access_token_customer})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toHaveProperty("jenisCukur", "Potong rambut pria");
          expect(res.body[0]).toHaveProperty("hargaCukur", 60000);
          expect(res.body[1]).toHaveProperty("jenisCukur", "Potong rambut anak");
          expect(res.body[1]).toHaveProperty("hargaCukur", 30000);
          expect(res.body[2]).toHaveProperty("jenisCukur", "Potong jenggot dan kumis");
          expect(res.body[2]).toHaveProperty("hargaCukur", 25000);
          expect(res.body[3]).toHaveProperty("jenisCukur", "Creambath pria");
          expect(res.body[3]).toHaveProperty("hargaCukur", 50000);
          expect(res.body[4]).toHaveProperty("jenisCukur", "Gentleman massage");
          expect(res.body[4]).toHaveProperty("hargaCukur", 70000);
          expect(res.body[5]).toHaveProperty("jenisCukur", "Gentleman full package");
          expect(res.body[5]).toHaveProperty("hargaCukur", 200000);
          done();
        });
    });

    test("FAIL, Access Token not present", (done) => {
      request(app)
        .get("/varian")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Invalid Token!");
          done();
        });
    });

    test("FAIL, Access Token Invalid", (done) => {
      request(app)
        .get("/varian")
        .set({"access_token": "access_token_customer"})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Invalid Token!");
          done();
        });
    });

    test("FAIL, Invalid Role", (done) => {
      request(app)
        .get("/varian")
        .set({"access_token": userToken({id: 3, role: 'helper'})})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Unidentifed Role!");
          done();
        });
    });
  });
})



describe("TRANSACTION TEST SUITE", () => {
  beforeAll((done) => {
    Customer.create({
      nama: "nama customer",
      alamat: "jl. Hacktiv no.8",
      telepon: "0812345678",
      password: "rahasia",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        access_token_customer = userToken({id: res.id, role: 'customer'});
        return Varian.bulkCreate(seed)
      })
      .then(_ => done())
      .catch((err) => console.log(err));
  });

  afterAll((done) => {
    Customer.destroy({
      truncate: true,
      cascade: true,
    })
      .then((res) => {return
        Varian.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("POST transaksi/", () => {
    test("SUCCESS, Post new transaksi", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 3,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 3
            },
            {
            jenisCukur: 'Potong rambut anak',
            jumlah: 1
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 6
            },
            {
            jenisCukur: 'Potong jenggot dan kumis',
            jumlah: 2
            }
        ]
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("CustomerId", jwt.verify(access_token_customer, process.env.JWT_SECRET).id)
          expect(res.body).toHaveProperty("TukangCukurId", 3)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

    test("FAIL, Access Token not present", (done) => {
      request(app)
        .post("/transaksi")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Invalid Token!");
          done();
        });
    });

    test("FAIL, Access Token Invalid", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": "access_token_customer"})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Invalid Token!");
          done();
        });
    });

    test("FAIL, Invalid Role", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": userToken({id: 3, role: 'helper'})})
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Unidentifed Role!");
          done();
        });
    });

  });


  // describe("PATCH transaksi/", () => {})
})