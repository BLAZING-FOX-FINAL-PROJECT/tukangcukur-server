"use strict";

const app = require("../app.js");
const request = require("supertest");
const { Customer } = require("../models");

describe("CUSTOMER TEST SUITE", () => {
  // beforeAll(done=>{
  //     Customer.create({
  //         name: 'admin',
  //         email: 'admin@mail.com',
  //         password: '1234',
  //         role: 'admin',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         })
  //     .then(res=>done())
  //     .catch(err=>console.log(err))
  // })

  // afterAll(done=>{
  //     Customer.destroy({
  //         where:{role:'admin'}
  //         })
  //     .then(res=>done())
  //     .catch(err=>console.log(err))
  // })
  
  describe("GET CUSTOMER", () => {
    test("SUCCESS, Get Customers Data", (done) => {
      request(app)
        .get("/customer")
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          // expect(res.body).toHaveProperty("access_token")
          done();
        });
    });
  });

  // test("admin login failed - wrong email", done=>{
  //     request(app)
  //     .post("/login")
  //     .send({
  //         email: "johndairy@ecommerce.com",
  //         password: "1234"
  //     })
  //     .end((err,res)=>{
  //         if (err) done(err)
  //         expect(res.status).toBe(400)
  //         expect(res.body).toBeInstanceOf(Object)
  //         expect(res.body).toHaveProperty("message", "Username/password didn't match")
  //         done()
  //     })
  // })

  // test("admin login failed - wrong password", done=>{
  //     request(app)
  //     .post("/login")
  //     .send({
  //         email: "admin@mail.com",
  //         password: "111111"
  //     })
  //     .end((err,res)=>{
  //         if (err) done(err)
  //         expect(res.status).toBe(400)
  //         expect(res.body).toBeInstanceOf(Object)
  //         expect(res.body).toHaveProperty("message", "Username/password didn't match")
  //         done()
  //     })
  // })

  // test("admin login failed - empty email", done=>{
  //     request(app)
  //     .post("/login")
  //     .send({
  //         email:"",
  //         password:"1234"
  //     })
  //     .end((err,res)=>{
  //         if (err) done(err)
  //         expect(res.status).toBe(400)
  //         expect(res.body).toBeInstanceOf(Object)
  //         expect(res.body).toHaveProperty("message", "Please fill in the email")
  //         done()
  //     })
  // })

  // test("admin login failed - empty password", done=>{
  //     request(app)
  //     .post("/login")
  //     .send({
  //         email:"admin@mail.com",
  //         password:""
  //     })
  //     .end((err,res)=>{
  //         if (err) done(err)
  //         expect(res.status).toBe(400)
  //         expect(res.body).toBeInstanceOf(Object)
  //         expect(res.body).toHaveProperty("message", "Please fill in the password")
  //         done()
  //     })
  // })
});
