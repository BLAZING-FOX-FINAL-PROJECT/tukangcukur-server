'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Varian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Varian.init({
    JenisCukur: DataTypes.STRING,
    HargaCukur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Varian',
  });
  return Varian;
};