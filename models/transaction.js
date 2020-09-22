'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Customer)
      Transaction.belongsTo(models.TukangCukur)
      Transaction.hasMany(models.TransactionDetail)
    }
  };
  Transaction.init({
    CustomerId: DataTypes.INTEGER,
    TukangCukurId: DataTypes.INTEGER,
    customerLatitude: DataTypes.DOUBLE,
    customerLongitude: DataTypes.DOUBLE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};