import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogrouter from "./routes/blog-routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogrouter);

mongoose
  .connect(
    "mongodb+srv://anujangir:2PR5zS2RGURtqzvN@mernapp.tiep5ls.mongodb.net/MERN_app?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));
