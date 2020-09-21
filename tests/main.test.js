"use strict";

const app = require("../app.js");
const request = require("supertest");
const userToken = require('../helpers/jwt')
const { Customer, TukangCukur, Varian, TransactionDetail, Transaction } = require("../models");
const jwt = require('jsonwebtoken')
const seed = require('../seeds/varianseed')

let access_token_customer;
let access_token_tukangCukur;

describe("LOGIN TEST SUITE", () => {
  beforeAll((done) => {
    Customer.create({
      nama: "nama customer",
      alamat: "jl. Hacktiv no.8",
      telepon: "+62812345678",
      password: "rahasia",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((res) => {
        access_token_customer = userToken({id: res.id, role: 'customer'});
        return TukangCukur.create({
          nama: "nama tukang cukur",
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.575489,
          longitude: 110.824326,
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

  describe("POST login/:role", () => {
    test("SUCCESS, Customer Login", (done) => {
      request(app)
        .post(`/login/customer`)
        .send({
          telepon: '0812345678',
          password: 'rahasia'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("access_token");
          done();
        });
    });

    test("SUCCESS, Tukang Cukur Login", (done) => {
      request(app)
        .post(`/login/tukangcukur`)
        .send({
          telepon: '0812345678',
          password: 'rahasia'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("access_token");
          done();
        });
    });

    test("FAIL, Customer Login without specific info", (done) => {
      request(app)
        .post(`/login/customer`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Wrong telepon/password!");
          done();
        });
    });

    test("FAIL, Tukang Cukur Login without specific info", (done) => {
      request(app)
        .post(`/login/tukangcukur`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Wrong telepon/password!");
          done();
        });
    });

    test("FAIL, Customer Login with wrong telephone info", (done) => {
      request(app)
        .post(`/login/customer`)
        .send({
          telepon: '+62812345678',
          password: 'rahasia'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Wrong telepon/password!");
          done();
        });
    });

    test("FAIL, Tukang Cukur Login with wrong telephone info", (done) => {
      request(app)
        .post(`/login/tukangcukur`)
        .send({
          telepon: '+62812345678',
          password: 'rahasia'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Wrong telepon/password!");
          done();
        });
    });

    test("FAIL, Tukang Cukur Login with wrong password", (done) => {
      request(app)
        .post(`/login/tukangcukur`)
        .send({
          telepon: '0812345678',
          password: 'rahasiaa'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Wrong telepon/password!");
          done();
        });
    });

    test("FAIL, Customer Login with wrong password", (done) => {
      request(app)
        .post(`/login/customer`)
        .send({
          telepon: '0812345678',
          password: 'rahasiaa'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Wrong telepon/password!");
          done();
        });
    });

  });
})

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
          password: "rahasia",
          latitude: -7.575489,
          longitude: 110.824326,
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



describe("TRANSACTION TEST SUITE - GET", () => {
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
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.575489,
          longitude: 110.824326,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        access_token_tukangCukur = userToken({id: res.id, role: 'tukangcukur'});
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
      .then((res) => {return
        Transaction.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => {return
        TransactionDetail.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("GET transaksi/", () => {
    test("SUCCESS, Get all transaksi", (done) => {
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
              jenisCukur: 'Potong jenggot dan kumis',
              jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 6
            }
        ]
        })
        .end((err, res) => {
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get("/transaksi")
            .set({"access_token": access_token_customer})
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              expect(res.body).toBeInstanceOf(Array);
              expect(res.body[0]).toHaveProperty("CustomerId", jwt.verify(access_token_customer, process.env.JWT_SECRET).id)
              expect(res.body[0]).toHaveProperty("TukangCukurId")
              expect(res.body[0]).toHaveProperty("status")
              expect(res.body[0]).toHaveProperty("TransactionDetails")
              expect(res.body[0].TransactionDetails).toBeInstanceOf(Array);
              expect(res.body[0].TransactionDetails[0]).toHaveProperty("TransactionId")
              expect(res.body[0].TransactionDetails[0]).toHaveProperty("VarianId")
              expect(res.body[0].TransactionDetails[0]).toHaveProperty("jumlah")
              expect(res.body[0].TransactionDetails[0]).toHaveProperty("Varian")
              expect(res.body[0].TransactionDetails[0].Varian).toHaveProperty("id")
              expect(res.body[0].TransactionDetails[0].Varian).toHaveProperty("jenisCukur")
              expect(res.body[0].TransactionDetails[0].Varian).toHaveProperty("hargaCukur")
              expect(res.body[0].TransactionDetails[1]).toHaveProperty("TransactionId")
              expect(res.body[0].TransactionDetails[1]).toHaveProperty("VarianId")
              expect(res.body[0].TransactionDetails[1]).toHaveProperty("jumlah")
              expect(res.body[0].TransactionDetails[1]).toHaveProperty("Varian")
              expect(res.body[0].TransactionDetails[1].Varian).toHaveProperty("id")
              expect(res.body[0].TransactionDetails[1].Varian).toHaveProperty("jenisCukur")
              expect(res.body[0].TransactionDetails[1].Varian).toHaveProperty("hargaCukur")
              expect(res.body[0].TransactionDetails[2]).toHaveProperty("TransactionId")
              expect(res.body[0].TransactionDetails[2]).toHaveProperty("VarianId")
              expect(res.body[0].TransactionDetails[2]).toHaveProperty("jumlah")
              expect(res.body[0].TransactionDetails[2]).toHaveProperty("Varian")
              expect(res.body[0].TransactionDetails[2].Varian).toHaveProperty("id")
              expect(res.body[0].TransactionDetails[2].Varian).toHaveProperty("jenisCukur")
              expect(res.body[0].TransactionDetails[2].Varian).toHaveProperty("hargaCukur")
              expect(res.body[0].TransactionDetails[3]).toHaveProperty("TransactionId")
              expect(res.body[0].TransactionDetails[3]).toHaveProperty("VarianId")
              expect(res.body[0].TransactionDetails[3]).toHaveProperty("jumlah")
              expect(res.body[0].TransactionDetails[3]).toHaveProperty("Varian")
              expect(res.body[0].TransactionDetails[3].Varian).toHaveProperty("id")
              expect(res.body[0].TransactionDetails[3].Varian).toHaveProperty("jenisCukur")
              expect(res.body[0].TransactionDetails[3].Varian).toHaveProperty("hargaCukur")

              expect(res.body[1]).toHaveProperty("CustomerId", jwt.verify(access_token_customer, process.env.JWT_SECRET).id)
              expect(res.body[1]).toHaveProperty("TukangCukurId")
              expect(res.body[1]).toHaveProperty("status")
              expect(res.body[1]).toHaveProperty("TransactionDetails")
              expect(res.body[1].TransactionDetails).toBeInstanceOf(Array);
              expect(res.body[1].TransactionDetails[0]).toHaveProperty("TransactionId")
              expect(res.body[1].TransactionDetails[0]).toHaveProperty("VarianId")
              expect(res.body[1].TransactionDetails[0]).toHaveProperty("jumlah")
              expect(res.body[1].TransactionDetails[0]).toHaveProperty("Varian")
              expect(res.body[1].TransactionDetails[0].Varian).toHaveProperty("id")
              expect(res.body[1].TransactionDetails[0].Varian).toHaveProperty("jenisCukur")
              expect(res.body[1].TransactionDetails[0].Varian).toHaveProperty("hargaCukur")
              expect(res.body[1].TransactionDetails[1]).toHaveProperty("TransactionId")
              expect(res.body[1].TransactionDetails[1]).toHaveProperty("VarianId")
              expect(res.body[1].TransactionDetails[1]).toHaveProperty("jumlah")
              expect(res.body[1].TransactionDetails[1]).toHaveProperty("Varian")
              expect(res.body[1].TransactionDetails[1].Varian).toHaveProperty("id")
              expect(res.body[1].TransactionDetails[1].Varian).toHaveProperty("jenisCukur")
              expect(res.body[1].TransactionDetails[1].Varian).toHaveProperty("hargaCukur")
              done()
            });
        });
        });

    });

    test("FAIL, Get all transaksi without token", (done) => {
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
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get("/transaksi")
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Invalid Token!");
              done()
            });
        });
        });
    });

    test("FAIL, Get all transaksi with invalid token", (done) => {
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
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get("/transaksi")
            .set({"access_token": "access_token_customer"})
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Invalid Token!");
              done()
            });
        });
        });
    });

    test("FAIL, Get all transaksi with invalid role", (done) => {
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
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get("/transaksi")
            .set({"access_token": userToken({id: 3, role: 'helper'})})
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Unidentifed Role!");
              done()
            });
        });
        });
    });

  });
})

describe("TRANSACTION TEST SUITE - GET By ID", () => {
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
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.575489,
          longitude: 110.824326,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        access_token_tukangCukur = userToken({id: res.id, role: 'tukangcukur'});
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
      .then((res) => {return
        Transaction.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => {return
        TransactionDetail.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("GET transaksi/:id", () => {
    test("SUCCESS, Get transaksi By Id", (done) => {
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
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get(`/transaksi/${res.body.id}`)
            .set({"access_token": access_token_customer})
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("CustomerId", jwt.verify(access_token_customer, process.env.JWT_SECRET).id)
              expect(res.body).toHaveProperty("TukangCukurId", 5)
              expect(res.body).toHaveProperty("status", "ongoing")
              expect(res.body).toHaveProperty("TransactionDetails")
              expect(res.body.TransactionDetails).toBeInstanceOf(Array);
              expect(res.body.TransactionDetails[0]).toHaveProperty("TransactionId")
              expect(res.body.TransactionDetails[0]).toHaveProperty("VarianId", 1)
              expect(res.body.TransactionDetails[0]).toHaveProperty("jumlah", 2)
              expect(res.body.TransactionDetails[0]).toHaveProperty("Varian")
              expect(res.body.TransactionDetails[0].Varian).toHaveProperty("id" ,1)
              expect(res.body.TransactionDetails[0].Varian).toHaveProperty("jenisCukur", "Potong rambut pria")
              expect(res.body.TransactionDetails[0].Varian).toHaveProperty("hargaCukur", 60000)
              expect(res.body.TransactionDetails[1]).toHaveProperty("TransactionId")
              expect(res.body.TransactionDetails[1]).toHaveProperty("VarianId", 6)
              expect(res.body.TransactionDetails[1]).toHaveProperty("jumlah", 5)
              expect(res.body.TransactionDetails[1]).toHaveProperty("Varian")
              expect(res.body.TransactionDetails[1].Varian).toHaveProperty("id", 6)
              expect(res.body.TransactionDetails[1].Varian).toHaveProperty("jenisCukur", "Gentleman full package")
              expect(res.body.TransactionDetails[1].Varian).toHaveProperty("hargaCukur", 200000)
              done()
            });
        });
        });

    });

    test("FAIL, Get transaksi By Id without token", (done) => {
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
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get(`/transaksi/${res.body.id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Invalid Token!");
              done()
            });
        });
        });
    });

    test("FAIL, Get transaksi By Id with invalid token", (done) => {
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
          request(app)
            .post("/transaksi")
            .set({"access_token": access_token_customer})
            .send({
              TukangCukurId: 5,
              servis: [
                {
                jenisCukur: 'Potong rambut pria',
                jumlah: 2
                },
                {
                jenisCukur: 'Gentleman full package',
                jumlah: 5
                }
              ]
            })
        .end((err, res) => {
          request(app)
            .get(`/transaksi/${res.body.id}`)
            .set({"access_token": "access_token_customer"})
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Invalid Token!");
              done()
            });
        });
        });
    });

    test("FAIL, Get all transaksi with invalid role", (done) => {
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
          request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 5,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 2
            },
            {
            jenisCukur: 'Gentleman full package',
            jumlah: 5
            }
        ]
        })
        .end((err, res) => {
          request(app)
            .get(`/transaksi/${res.body.id}`)
            .set({"access_token": userToken({id: 3, role: 'helper'})})
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Unidentifed Role!");
              done()
            });
        });
        });
    });

  });
})



describe("TRANSACTION TEST SUITE - POST", () => {
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
      .then((res) => {return
        Transaction.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => {return
        TransactionDetail.destroy({
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

    test("FAIL, Post new transaksi outside Varian scope", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 1,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 3
            },
            {
            jenisCukur: 'Potong rambut lain',
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
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Varian not found")
          done();
        });
    });

    test("FAIL, Post new transaksi with invalid 'jumlah'", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 2,
          servis: [
            {
            jenisCukur: 'Potong rambut pria',
            jumlah: 0
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
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Bad jumlah request")
          done();
        });
    });

    test("FAIL, Post new transaksi with no servis info", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: 2,
          servis: []
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", "Bad servis request")
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
})


describe("TRANSACTION TEST SUITE - PATCH", () => {
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
          password: "rahasia",
          latitude: -7.575489,
          longitude: 110.824326,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        access_token_tukangCukur = userToken({id: res.id, role: 'tukangcukur'});
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
      .then((res) => {return
        Transaction.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => {return
        TransactionDetail.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("PATCH transaksi/", () => {
    test("SUCCESS, Patch existing transaksi via Customer", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
          request(app)
            .patch(`/transaksi/${res.body.id}`)
            .set({"access_token": access_token_customer})
            .send({
              status: 'completed'
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("CustomerId", jwt.verify(access_token_customer, process.env.JWT_SECRET).id)
              expect(res.body).toHaveProperty("TukangCukurId", jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id)
              expect(res.body).toHaveProperty("status", "completed")
              done();
            });
        });
    });

    test("SUCCESS, Patch existing transaksi via tukangCukur", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
          request(app)
            .patch(`/transaksi/${res.body.id}`)
            .set({"access_token": access_token_tukangCukur})
            .send({
              status: 'cancelled'
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(200);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("CustomerId", jwt.verify(access_token_customer, process.env.JWT_SECRET).id)
              expect(res.body).toHaveProperty("TukangCukurId", jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id)
              expect(res.body).toHaveProperty("status", "cancelled")
              done();
            });
        });
    });

    test("FAIL, Unauthorized Patch existing transaksi via Customer", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
          request(app)
            .patch(`/transaksi/${res.body.id + 1}`)
            .set({"access_token": access_token_customer})
            .send({
              status: 'cancelled'
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Unauthorized action!")
              done();
            });
        });
    });

    test("FAIL, Unauthorized Patch existing transaksi via tukangCukur", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
          request(app)
            .patch(`/transaksi/${res.body.id + 1}`)
            .set({"access_token": access_token_tukangCukur})
            .send({
              status: 'cancelled'
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res.status).toBe(401);
              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty("message", "Unauthorized action!")
              done();
            });
        });
    });

    test("FAIL, Access Token not present", (done) => {
      request(app)
      .post("/transaksi")
      .set({"access_token": access_token_customer})
      .send({
        TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
        request(app)
          .patch(`/transaksi/${res.body.id}`)
          .send({
            status: 'cancelled'
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).toBe(401);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("message", "Invalid Token!");
            done();
          });
      });
    });

    test("FAIL, Access Token Invalid", (done) => {
      request(app)
      .post("/transaksi")
      .set({"access_token": access_token_customer})
      .send({
        TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
        request(app)
          .patch(`/transaksi/${res.body.id}`)
          .set({"access_token": "access_token_customer"})
          .send({
            status: 'cancelled'
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).toBe(401);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("message", "Invalid Token!");
            done();
          });
      });
    });

    test("FAIL, Invalid Role", (done) => {
      request(app)
      .post("/transaksi")
      .set({"access_token": access_token_customer})
      .send({
        TukangCukurId: jwt.verify(access_token_tukangCukur, process.env.JWT_SECRET).id,
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
        request(app)
          .patch(`/transaksi/${res.body.id}`)
          .set({"access_token": userToken({id: 3, role: 'helper'})})
          .send({
            status: 'cancelled'
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).toBe(401);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("message", "Unidentifed Role!");
            done();
          });
      });
    });
  });
})