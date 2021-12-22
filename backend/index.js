import express from "express";
import cors from "cors";
const server = express();

import blogRoute from "./routes/blog.route.js";

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/blog", blogRoute);

server.listen(9090, () => {
  console.log(`Server started on port: 9090`);
});
