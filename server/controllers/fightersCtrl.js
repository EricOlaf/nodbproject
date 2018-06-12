const axios = require("axios");

let fighters = [];

axios.get("http://ufc-data-api.ufc.com/api/v1/us/fighters").then(response => {
  fighters = response.data.slice(0, 30);
});

const getFighters = (req, res) => {
  res.status(200).json(fighters);
};

const getFilteredFighters = (req, res) => {
  const { filter } = req.query;
  let filteredFighters = fighters.filter(fighter =>
    (fighter.first_name + fighter.last_name).includes(filter)
  );
  res.status(200).send(filteredFighters);
};

const deleteFighter = (req, res) => {
  const { id } = req.params;
  let indexOfFighter = fighters.findIndex(fighter => fighter.id == id);
  fighters.splice(indexOfFighter, 1);
  res.status(200).send(fighters);
};

const createFighter = (req, res) => {
  const { first_name, last_name, weight_class } = req.body;
  const { id } = req.params;
  let newFighter = {
    first_name,
    last_name,
    weight_class,
    id
  };
  fighters.push(newFighter);
  res.status(200).send(fighters);
};

const updateFighter = (req, res) => {
  const { first_name, last_name, weight_class } = req.body;
  const { id } = req.params;

  let indexOfFighter = fighters.findIndex(fighters => fighters.id == id);
  fighters[indexOfFighter].name = name;

  res.status(200).send(fighters);
};

module.exports = {
  getFighters,
  getFilteredFighters,
  deleteFighter,
  createFighter,
  updateFighter
};
