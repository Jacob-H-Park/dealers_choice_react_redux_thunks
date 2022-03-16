const { Sequelize, STRING } = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme-react-redux"
);
const faker = require("faker");

const Model = db.define("model", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
};

syncAndSeed();
