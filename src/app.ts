import express, {
  urlencoded,
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { userRoute } from "./module/user/user.route";
import { issueRoute } from "./module/issue/issue.route";
import { authRoute } from "./module/auth/auth.route";
import fs from "fs";
import logger from "./middleware/logger";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: "Express Server Running",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use("/api/issues", issueRoute);
app.use("/api/auth", authRoute);

// app.get("/api/users", userRoute);

export default app;
