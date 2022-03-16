const express = require("express");
const app = express();
const path = require("path");
const faker = require("faker");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

app.get("/api/phonenumbers", async (req, res, next) => {
  try {
    res.send(await PhoneNumber.findAll());
  } catch (err) {
    next(err);
  }
});

app.post("/api/phonenumbers/random", async (req, res, next) => {
  try {
    res.status(201).send(await PhoneNumber.createRandom());
  } catch (err) {
    next(err);
  }
});
app.post("/api/phonenumbers", async (req, res, next) => {
  try {
    res.send(await Grocery.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/phonenumbers/:id", async (req, res, next) => {
  try {
    const numberToUpdate = await PhoneNumber.findByPk(req.params.id);
    await numberToUpdate.update(req.body);
    res.send(numberToUpdate);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/phonenumbers/:id", async (req, res, next) => {
  try {
    const numberToRemove = await PhoneNumber.findByPk(req.params.id);
    await numberToRemove.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//SEQUELIZE

const { Sequelize, STRING, BOOLEAN } = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme-react-redux"
);

const PhoneNumber = db.define("phonenumber", {
  number: {
    type: STRING(12),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  taken: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

PhoneNumber.createRandom = function () {
  const randomNumber = faker.phone.phoneNumberFormat();
  return this.create({ number: randomNumber });
};

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await PhoneNumber.create({ number: "810-779-5640" });
    await PhoneNumber.create({ number: "449-579-7459" });
    await PhoneNumber.create({ number: "240-767-2662" });
  } catch (err) {
    console.log(err);
  }
};

syncAndSeed();
