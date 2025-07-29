const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [
    category,
  ]);
}

async function getAllItems() {
  const { rows } = await pool.query(
    "SELECT items.*, categories.category_name FROM items JOIN categories ON items.category_id = categories.id"
  );
  return rows;
}

async function insertItem(item) {
  await pool.query(
    "INSERT INTO items (item_name, quantity, price, category_id) VALUES ($1, $2, $3, $4)",
    [item.item_name, item.quantity, item.price, item.category_id]
  );
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function updateCategory(id, category) {
  await pool.query("UPDATE categories SET category_name = $2 WHERE id = $1", [
    id,
    category,
  ]);
}

async function getItemById(id) {
  const { rows } = await pool.query(
    "SELECT items.*, categories.category_name FROM items JOIN categories ON items.category_id = categories.id WHERE items.id = $1",
    [id]
  );
  return rows[0];
}

async function updateItem(id, item) {
  await pool.query(
    "UPDATE items SET item_name = $2, quantity = $3, price = $4, category_id = $5 WHERE id = $1",
    [id, item.item_name, item.quantity, item.price, item.category_id]
  );
}

async function deleteItem(id) {
  await pool.query("DELETE from items WHERE id = $1", [id]);
}

async function deleteCategory(id) {
  await pool.query("DELETE from categories WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  insertCategory,
  getAllItems,
  insertItem,
  getCategoryById,
  updateCategory,
  getItemById,
  updateItem,
  deleteItem,
  deleteCategory,
};
