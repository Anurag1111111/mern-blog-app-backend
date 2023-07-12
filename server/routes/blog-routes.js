import express from "express";
import {
  addBlog,
  deleteBLog,
  getAllBlogs,
  getByUserId,
  getbyId,
  updateBlog,
} from "../controllers/blog-controller.js";
const blogrouter = express.Router();

blogrouter.get("/", getAllBlogs);
blogrouter.post("/add", addBlog);
blogrouter.put("/update/:id", updateBlog);
blogrouter.get("/:id", getbyId);
blogrouter.delete("/:id", deleteBLog);
blogrouter.get("/user/:id", getByUserId);

export default blogrouter;
