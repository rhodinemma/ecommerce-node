const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategory");
//const ApiError = require("../utils/apiError");

// @desc    Create SubCategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
