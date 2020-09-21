const app = require("../app.js");
const request = require("supertest");
const userToken = require('../helpers/jwt')
const { Customer, TukangCukur, Varian, TransactionDetail, Transaction } = require("../models");
const jwt = require('jsonwebtoken')
const seed = require('../seeds/varianseed')

let access_token_customer;
let access_token_tukangCukur;
let TukangCukurIdSolo
let TukangCukurIdSurabaya
let TukangCukurIdJakarta


describe("TRANSACTION TEST SUITE - POST WITH LARGEST DISTANCE", () => {
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
      .then((res) => {
        return TukangCukur.create({
          nama: "tukang cukur solo",
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
        TukangCukurIdSolo = res.id
        return TukangCukur.update({status:true},{where:{id:res.id}})
      })
      .then((res) => {
        return TukangCukur.create({
          nama: "tukang cukur surabaya",
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.257472,
          longitude: 112.752090,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        TukangCukurIdSurabaya = res.id
        return TukangCukur.update({status:true},{where:{id:res.id}})
      })
      .then((res) => {
        return TukangCukur.create({
          nama: "tukang cukur jakarta",
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -6.175110,
          longitude: 106.865036,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        TukangCukurIdJakarta = res.id
        return TukangCukur.update({status:true},{where:{id:res.id}})
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
      .then((res) => {return
        TukangCukur.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("POST transaksi/ with auto matcher", () => {
    test("SUCCESS, Post new transaksi from Semarang", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          customerLatitude: -7.03275,
          customerLongitude: 110.420837,
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
          expect(res.body).toHaveProperty("TukangCukurId", TukangCukurIdSolo)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

    test("SUCCESS, Post new transaksi from Serang", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          customerLatitude: -6.135093,
          customerLongitude: 106.160889,
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
          expect(res.body).toHaveProperty("TukangCukurId", TukangCukurIdJakarta)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

    test("SUCCESS, Post new transaksi from Sidoarjo", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          customerLatitude: -7.449624,
          customerLongitude: 112.72522,
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
          expect(res.body).toHaveProperty("TukangCukurId", TukangCukurIdSurabaya)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

  });
})

let TukangCukurIdStadionManahan
let TukangCukurIdMakamHaji
let TukangCukurIdTamanSriwedari

describe("TRANSACTION TEST SUITE - POST WITH FUNCTIONAL DISTANCE", () => {
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
      .then((res) => {
        return TukangCukur.create({
          nama: "tukang cukur sekitar stadion manahan",
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.555632,
          longitude: 110.805767,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        TukangCukurIdStadionManahan = res.id
        return TukangCukur.update({status:true},{where:{id:res.id}})
      })
      .then((res) => {
        return TukangCukur.create({
          nama: "tukang cukur sekitar makam haji",
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.564098,
          longitude: 110.775211,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        TukangCukurIdMakamHaji = res.id
        return TukangCukur.update({status:true},{where:{id:res.id}})
      })
      .then((res) => {
        return TukangCukur.create({
          nama: "tukang cukur sekitar taman sriwedari",
          telepon: "+62812345678",
          urlPhoto: "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@.jpg",
          password: "rahasia",
          latitude: -7.568863,
          longitude: 110.812848,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
      .then((res) => {
        TukangCukurIdTamanSriwedari = res.id
        return TukangCukur.update({status:true},{where:{id:res.id}})
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
      .then((res) => {return
        TukangCukur.destroy({
          truncate: true,
          cascade: true
        })
      })
      .then((res) => done())
      .catch((err) => console.log(err));
  });

  describe("POST transaksi/ with auto matcher", () => {
    test("SUCCESS, Post new transaksi from Solo - Stadion Manahan", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          customerLatitude:  -7.552846,
          customerLongitude: 110.79154,
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
          expect(res.body).toHaveProperty("TukangCukurId", TukangCukurIdStadionManahan)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

    test("SUCCESS, Post new transaksi from Makam Haji", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          customerLatitude: -7.564928,
          customerLongitude: 110.78845,
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
          expect(res.body).toHaveProperty("TukangCukurId", TukangCukurIdMakamHaji)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

    test("SUCCESS, Post new transaksi from Taman Sriwedari", (done) => {
      request(app)
        .post("/transaksi")
        .set({"access_token": access_token_customer})
        .send({
          customerLatitude: -7.56697,
          customerLongitude: 110.825357,
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
          expect(res.body).toHaveProperty("TukangCukurId", TukangCukurIdTamanSriwedari)
          expect(res.body).toHaveProperty("status", "ongoing")
          done();
        });
    });

  });
})

