const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "batch7",
  password: "admin",
  port: 5432
});

const app = express();

app.use(cors());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = process.env.PORT || 1337

app.listen(port, () => console.log(`Server listening on port ${port}`));

app.post("/api/v1/regions", (req, res) => {
  const { region_name } = req.body;

  pool.query(
    "INSERT INTO regions (region_name) VALUES ($1)",
    [region_name],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.sendStatus(201);
    }
  );
});

app.get("/api/v1/regions", (req, res) => {
  pool.query(
    "select region_id,region_name from regions",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

app.get("/api/v1/regions/:id", (req, res) => {
  const { id } = req.params;

  pool.query(
    "select region_id,region_name from regions WHERE region_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

app.put("/api/v1/regions/", (req, res) => {
  //const { id } = req.params;
  const { region_id,region_name } = req.body;

  pool.query(
    "UPDATE regions SET region_name = $2 WHERE region_id = $1",
    [region_id,region_name],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.sendStatus(200);
    }
  );
});

app.delete("/api/v1/regions/:id", (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM regions WHERE region_id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.sendStatus(200);
  });
});

