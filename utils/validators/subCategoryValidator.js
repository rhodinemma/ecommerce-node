const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID format"),
  validationMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 2 })
    .withMessage("subCategory name is too short")
    .isLength({ max: 32 })
    .withMessage("subCategory name is too long"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to a category")
    .isMongoId()
    .withMessage("Invalid Category ID format"),
  validationMiddleware,
];

// exports.updateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subCategory ID format"),
//   validationMiddleware,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subCategory ID format"),
//   validationMiddleware,
// ];
