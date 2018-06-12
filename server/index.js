const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fc = require("./controllers/fightersCtrl");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//testing
app.get("/api/test", (req, res) => {
  res.status(200).send("connected");
});

//Endpoints
app.get("/api/fighters", fc.getFighters);
app.get("/api/fighters/filter", fc.getFilteredFighters);
app.post("/api/fighters", fc.createFighter);
app.delete("/api/fighters/:id", fc.deleteFighter);
app.put("/api/fighters/:id", fc.updateFighter);

const port = 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
