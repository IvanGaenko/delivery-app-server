import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import Cors from "cors";

import { clientApi } from "./config";

const app = express();
const port = 3001;
const whiteList = [clientApi];
import apiRouter from "./routes";

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(Cors(corsOptions));

app.use(apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", async (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.originalUrl} does not exist on the server`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
