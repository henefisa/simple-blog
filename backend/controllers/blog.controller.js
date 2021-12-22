import { v4 as uuid } from "uuid";
import { Blog } from "../models/blog.model.js";
import db from "../utils/database.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, body, author } = req.body;

    const id = uuid();
    const blog = new Blog(id, title, body, author);

    await db.read();
    db.data = db.data || { blogs: [] };
    db.data.blogs.push(blog);
    await db.write();
    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR!");
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, body, author } = req.body;
    await db.read();
    db.data = db.data || { blogs: [] };
    const found = db.data.blogs.filter((blog) => blog.id === id);
    if (!found.length) res.status(404).json({ message: "Not found" });

    const newBlog = {
      id,
      title: title || found[0].title,
      body: body || found[0].body,
      author: author || found[0].author,
    };

    db.data.blogs = db.data.blogs.map((blog) =>
      blog.id === id ? newBlog : blog
    );
    await db.write();
    res.status(200).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR!");
  }
};

export const getAllBlog = async (req, res, next) => {
  try {
    await db.read();
    db.data = db.data || { blogs: [] };
    await db.write();
    res.status(200).json({
      blogs: db.data.blogs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.read();
    db.data = db.data || { blogs: [] };
    const found = db.data.blogs.filter((blog) => blog.id === id);
    if (!found.length) res.status(404).json({ message: "Not found" });
    await db.write();
    res.status(200).json(found[0]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.read();
    db.data = db.data || { blogs: [] };
    const found = db.data.blogs.filter((blog) => blog.id === id);
    if (!found.length) res.status(404).json({ message: "Not found" });
    db.data.blogs = db.data.blogs.filter((blog) => blog.id !== id);
    await db.write();
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};
