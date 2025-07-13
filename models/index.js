const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("bulletin_board", "root", "Welcome1", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.posts = require("./post.model.js")(sequelize, DataTypes);

module.exports = db;