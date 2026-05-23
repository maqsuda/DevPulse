import express, {
  urlencoded,
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { userRoute } from "./module/user/user.route";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: "Express Server Running",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
// app.use("/api/profile", profileRoute);
// app.use("/api/auth", authRoute);

// app.get("/api/users", userRoute);

export default app;
