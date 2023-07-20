/* eslint-disable import/no-extraneous-dependencies */
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Category = require("../models/category");
const factory = require("./handlersFactory");

// 1- DiskStorage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    // category-${id}-Date.now().jpeg
    const ext = file.mimetype.split("/")[1];
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });

exports.uploadCategoryImage = upload.single("image");

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(Category);
