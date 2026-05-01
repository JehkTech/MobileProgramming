'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Vehicle.init({
    gtfsVehicleId: DataTypes.STRING,
    routeId: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    heading: DataTypes.INTEGER,
    recordedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};