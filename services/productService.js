const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  // Build query
  const documentsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .limitFields()
    .sort();

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);
