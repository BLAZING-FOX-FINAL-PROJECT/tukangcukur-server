'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    nama: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Nama is required"
        }
      }
    },
    alamat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Alamat is required"
        }
      }
    },
    telepon: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Telepon is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};