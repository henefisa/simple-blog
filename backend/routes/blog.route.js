import express from "express";
import {
  createBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const route = express.Router();

route.post("/create", createBlog);
route.get("/", getAllBlog);
route.get("/:id", getBlog);
route.delete("/:id", deleteBlog);
route.patch("/:id", updateBlog);

export default route;
