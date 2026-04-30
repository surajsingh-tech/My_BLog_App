import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./config/db.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.routes.js";
import contact from "./routes/contact.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-blog-app-pearl-psi.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/contact", contact);

ConnectDb();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
