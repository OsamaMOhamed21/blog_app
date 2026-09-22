import { testConnectionDB } from "./DB/connection.db.js";
import express from "express";
import authController from "./modules/auth/auth.controller.js";
import blogController from "./modules/blog/blog.controller.js";
import userController from "./modules/user/user.controller.js";
const bootstrap = () => {
  const app = express();
  const port = 3000;
  app.get("/", (req, res, next) => res.json({ message: "Done" }));

  //convert json buffer Data
  app.use(express.json());

  //DB
  testConnectionDB();

  // modules
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/blog", blogController);

  app.get("{/*dummy}", (req, res, next) =>
    res.status(404).json({ message: "In-valid Routing" }),
  );

  return app.listen(port, 512, () => {
    console.log(`server is running in Port ${port}`);
  });
};
export default bootstrap;
