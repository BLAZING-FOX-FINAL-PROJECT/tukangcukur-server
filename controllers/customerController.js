const { Customer } = require("../models");

class customerController {
  static async getCustomers(req, res, next) {
    try {
      const customers = await Customer.findAll();
      res.status(200).json(customers);
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error",
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
        password: req.body.password,
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
      if (customer === null) throw err;
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
      const id = req.params.id;
      const customer = await Customer.update(
        {
          nama: req.body.nama,
          alamat: req.body.alamat,
          telepon: req.body.telepon,
        },
        {
          where: { id },
          returning: true,
        }
      );
      res.status(201).json(customer[1][0]);
    } catch (error) {
      next({
        status: 400,
        message: error.message,
      });
    }
  }

  static async delCustomer(req, res, next) {
    try {
      const id = req.params.id;
      const customer = await Customer.destroy({
        where: { id },
      });
      console.log(customer);
      if (!customer) throw error;
      res.status(200).json(customer);
    } catch (error) {
      next({
        status: 404,
        message: "Customer not found",
      });
    }
  }
}

module.exports = customerController;
