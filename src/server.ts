import express from "express";
import { routesApp } from "./config/routes";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
routesApp(app);

app.listen(process.env.PORT, () =>
  console.log(`Server is running ${process.env.PORT}`)
);
