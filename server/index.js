import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogrouter from "./routes/blog-routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-blog-app.onrender.com"],
  })
);
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogrouter);

const PORT = process.env.PORT || 5000;
console.log(process.env.DATABASE_URL);
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT))
  .then(() => console.log(`Connected to the database at ${PORT}`))
  .catch((err) => console.log(err));
