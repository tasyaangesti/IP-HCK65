'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init({
    review: {type: DataTypes.STRING,
    allowNull: false,
  validate: {
    notEmpty: {
      message: "Review is required"
    }, notNull: {
      message: "Review is required"
    }
  }},
    nama: {type: DataTypes.STRING,
    allowNull: false,
  validate: {
    notEmpty: {
      message: "Nama is required"
    }, notNull: {
      message: "Nama is required"
    }
  }},
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};