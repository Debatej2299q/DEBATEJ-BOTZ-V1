const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../data/database.sqlite'),
  logging: false,
});

const User = sequelize.define('User', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  country: DataTypes.STRING,
  gender: DataTypes.STRING,
  hobby: DataTypes.STRING,
  coins: { type: DataTypes.INTEGER, defaultValue: 0 },
  role: { type: DataTypes.STRING, defaultValue: "user" },
  pokedex: { type: DataTypes.JSON, defaultValue: [] },
  isBanned: { type: DataTypes.BOOLEAN, defaultValue: false },
  bonusReceived: { type: DataTypes.BOOLEAN, defaultValue: false },
  captainCountry: DataTypes.STRING,
});

const Group = sequelize.define('Group', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  inviteLink: DataTypes.STRING,
  mainGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
  supportGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = {
  sequelize,
  User,
  Group,
  setup: async () => {
    await sequelize.sync();
  }
};
