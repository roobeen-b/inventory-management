const { Router } = require("express");
const {
  addItem,
  fetchAllItems,
  getAddNewItemPage,
  getEditItemPage,
  editItem,
  removeItem,
} = require("../controllers/itemController");
const router = Router();

router.get("/", fetchAllItems);
router.post("/add", addItem);
router.get("/add", getAddNewItemPage);
router.get("/edit/:id", getEditItemPage);
router.post("/edit/:id", editItem);
router.post("/delete/:id", removeItem);

module.exports = router;
