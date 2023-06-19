const express = require("express");
const { getCategories } = require("../services/categoryService");

const router = express.Router();

router.post("/", getCategories);

module.exports = router;
