const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Drinks = require("./coctale");

const { DB_HOST } = process.env;

const app = express();

app.use(express.json());

app.get("/drinks", async (req, res) => {
  const results = await Drinks.find({});
  res.json({
    data: results,
  });
});

// app.get("/drinks/:search", async (req, res) => {
//   const { search } = req.params;
//   const results = await Drinks.find({ strDrink: { $regex: search, $options: "i" } });
//   res.json({
//     data: results,
//   });
// });

app.get("/drinks/:search", async (req, res) => {
  const { search } = req.params;
  const results = await Drinks.aggregate([
    { $sample: { size: Number(search) } },
    { $project: { _id: "$_id", strDrink: "$strDrink", strDrinkThumb: "$strDrinkThumb" } },
  ]);
  res.json({
    data: results,
  });
});

// app.get("/drinks/:search", async (req, res) => {
//   const { search } = req.params;
//   const array = search.split(",");
//   const results = await Drinks.find({ strIngredient: { $all: array } });
//   res.json({
//     data: results,
//   });
// });

// app.get("/drinks/:search", async (req, res) => {
//   const { search } = req.params;
//   const array = search.split(",");
//   const results = await Drinks.distinct("strCategory");
//   res.json({
//     data: results,
//   });
// });

app.listen(3001, (err) => {
  console.log("Server is running");
  mongoose.set("strictQuery", false);
  mongoose.connect(DB_HOST, () => {
    console.log("Database is connect");
  });
});
