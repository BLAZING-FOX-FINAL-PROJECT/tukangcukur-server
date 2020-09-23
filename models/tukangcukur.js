'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class TukangCukur extends Model {
    static associate(models) {
      TukangCukur.belongsToMany(models.Customer, {
        through: 'Transactions'
      })
    }
  };
  TukangCukur.init({
    nama:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nama is required",
        },
      },
    },
    telepon:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Telepon is required",
        },
      },
    },
    urlPhoto:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Photo is required",
        },
      },
    },
    password:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required",
        },
      },
    },
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    rating: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TukangCukur',
  });
  TukangCukur.beforeCreate((instance,options)=>{
    instance.telepon = instance.telepon.replace('+62','0')
    const salt = bcrypt.genSaltSync(5);
    instance.password = bcrypt.hashSync(instance.password, salt);
    instance.rating = 5
    instance.status = false
  })
  return TukangCukur;
};