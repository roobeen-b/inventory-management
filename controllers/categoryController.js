const {
  insertCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../db/queries");

const fetchAllCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.render("categories", { categories });
};

const addCategory = async (req, res) => {
  const { category } = req.body;
  await insertCategory(category);
  res.redirect("/categories");
};

const getAddNewCategoryPage = async (req, res) => {
  res.render("addCategory");
};

const getEditCategoryPage = async (req, res) => {
  const { id } = req.params;
  const category = await getCategoryById(id);
  res.render("editCategory", { category });
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  await updateCategory(id, category);
  res.redirect("/categories");
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  await deleteCategory(id);
  res.redirect("/categories");
};

module.exports = {
  fetchAllCategories,
  addCategory,
  getAddNewCategoryPage,
  getEditCategoryPage,
  editCategory,
  removeCategory,
};
