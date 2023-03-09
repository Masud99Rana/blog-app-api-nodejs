const express = require("express");
const {
  categoryDetails,
  createCategory,
  deleteCategory,
  updateCategory,
  fetchCategories,
} = require("../controllers/categoryController");
const isLogin = require("../middlewares/isLogin");

const categoryRouter = express.Router();

//POST/api/v1/categories
categoryRouter.post("/", isLogin, createCategory);

//GET/api/v1/categories
categoryRouter.get("/", fetchCategories);
//GET/api/v1/categories/:id
categoryRouter.get("/:id", categoryDetails);

//DELETE/api/v1/categories/:id
categoryRouter.delete("/:id", isLogin, deleteCategory);

//PUT/api/v1/categories/:id
categoryRouter.put("/:id", isLogin, updateCategory);

module.exports = categoryRouter;
