const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const categoryRoute = require("./routes/categoryRoute");
const itemRoute = require("./routes/itemRoute");
const { getAllItems, getAllCategories } = require("./db/queries");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categoryRoute);
app.use("/items", itemRoute);

app.get("/", async (req, res) => {
  const items = await getAllItems();
  const categories = await getAllCategories();

  res.render("index", { items, categories });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
