'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Varian extends Model {
    static associate(models) {
      Varian.hasMany(models.TransactionDetail)
    }
  };
  Varian.init({
    jenisCukur: DataTypes.STRING,
    hargaCukur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Varian',
  });
  return Varian;
};