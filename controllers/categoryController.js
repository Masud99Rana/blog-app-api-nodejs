const Category = require("../models/categoryModel");
const { appErr } = require("../utils/appErr");

//create
const createCategory = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({ title, user: req.userAuth });
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//all
const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//single
const categoryDetails = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Deleted successfully",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//update
const updateCategory = async (req, res) => {
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  categoryDetails,
  createCategory,
  deleteCategory,
  updateCategory,
  fetchCategories,
};
