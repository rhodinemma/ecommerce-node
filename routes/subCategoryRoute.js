const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router.route("/:id").get(getSubCategoryValidator, getSubCategory);

module.exports = router;
