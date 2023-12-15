"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
      Recipe.hasMany(models.Transaction);
      
    }
  }
  Recipe.init(
    {
      title: {type: DataTypes.STRING,
      allowNull: false,
    validate: {
      notEmpty: {
        message: " Title is required"
      }, notNull: {
        message: "Title is required"
      }
    }},
      image: {type: DataTypes.STRING,
      allowNull: false,
    validate: {
      notEmpty: {
        message: " Image is required"
      }, notNull: {
        message: "Image is required"
      }
    }},
      ingredients: {type: DataTypes.STRING,
      allowNull: false,
    validate: {
      notEmpty: {
        message: " Ingredients is required"
      }, notNull: {
        message: "Ingredients is required"
      }
    }},
      instruction: {type: DataTypes.STRING,
      allowNull: false,
    validate: {
      notEmpty: {
        message: " Instruction is required"
      }, notNull: {
        message: "Instruction is required"
      }
    }},
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
