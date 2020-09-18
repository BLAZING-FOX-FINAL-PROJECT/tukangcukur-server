const { Customer } = require("../models");

class customerController {
  static async getCustomers(req, res, next) {
    try {
      const customers = await Customer.findAll();
      res.status(200).json(customers);
    } catch (error) {
      next({
        status: 500,
        message: error.message,
      });
    }
  }

  static async postCustomer(req, res, next) {
    try {
      // console.log(payload);
      const newCustomer = await Customer.create({
        nama: req.body.nama,
        alamat: req.body.alamat,
        telepon: req.body.telepon,
      });
      res.status(201).json(newCustomer);
    } catch (error) {
      next({
        status: 400,
        message: error.message,
      });
    }
  }

  static async getCustomer(req, res, next) {
    try {
      const id = req.params.id;
      const customer = await Customer.findOne({
        where: { id },
      });
      res.status(200).json(customer);
    } catch (err) {
      next({
        status: 404,
        message: "Data Customer Not Found",
      });
    }
  }

  static async putCustomer(req, res, next) {
    try {
      res.send("tes get putCustomer");
    } catch (error) {
      res.send(error);
    }
  }

  static async delCustomer(req, res, next) {
    try {
      res.send("tes get delCustomer");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = customerController;
