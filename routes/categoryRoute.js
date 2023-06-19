const express = require("express");
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const { param, validationResult } = require("express-validator");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(
    // 1 - rules
    param("id").isMongoId().withMessage("Invalid category ID"),
    // 2 - middleware => catch errors from rules if exist
    (req, res) => {
      // finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.any() });
      }
    },
    getCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
