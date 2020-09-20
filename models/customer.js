"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsToMany(models.TukangCukur, {
        through: 'Transactions'
      })
    }
  }
  Customer.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nama is required",
          },
        },
      },
      alamat: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Alamat is required",
          },
        },
      },
      telepon: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Telepon is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.beforeCreate((instance) => {
    instance.telepon = instance.telepon.replace('+62','0')
    const salt = bcrypt.genSaltSync(5);
    instance.password = bcrypt.hashSync(instance.password, salt);
  });
  return Customer;
};
