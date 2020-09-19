'use strict';
const {
  Model
} = require('sequelize');
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
    rating: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TukangCukur',
  });
  TukangCukur.beforeCreate((instance,options)=>{
    instance.rating = 5
    instance.status = false
  })
  return TukangCukur;
};