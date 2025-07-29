const {
  insertItem,
  updateItem,
  getAllItems,
  getItemById,
  getAllCategories,
  deleteItem,
} = require("../db/queries");

const addItem = async (req, res) => {
  const { item_name, quantity, price, category_id } = req.body;
  await insertItem({ item_name, quantity, price, category_id });
  res.redirect("/items");
};

const fetchAllItems = async (req, res) => {
  const items = await getAllItems();
  res.render("items", { items });
};

const getAddNewItemPage = async (req, res) => {
  const categories = await getAllCategories();
  res.render("addItem", { categories });
};

const getEditItemPage = async (req, res) => {
  const { id } = req.params;
  const item = await getItemById(id);
  const categories = await getAllCategories();
  res.render("editItem", { item, categories });
};

const editItem = async (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, price, category_id } = req.body;
  await updateItem(id, { item_name, quantity, price, category_id });
  res.redirect("/items");
};

const removeItem = async (req, res) => {
  const { id } = req.params;

  await deleteItem(id);
  res.redirect("/items");
};

module.exports = {
  addItem,
  fetchAllItems,
  getAddNewItemPage,
  getEditItemPage,
  editItem,
  removeItem,
};
