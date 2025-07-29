const { Router } = require("express");
const {
  addCategory,
  fetchAllCategories,
  getAddNewCategoryPage,
  getEditCategoryPage,
  editCategory,
  removeCategory,
} = require("../controllers/categoryController");
const router = Router();

router.get("/", fetchAllCategories);
router.post("/add", addCategory);
router.get("/add", getAddNewCategoryPage);
router.get("/edit/:id", getEditCategoryPage);
router.post("/edit/:id", editCategory);
router.post("/delete/:id", removeCategory);

module.exports = router;
