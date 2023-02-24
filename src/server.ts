import express from "express";
import { routesApp } from "./config/routes";
import "dotenv/config";

const app = express();
app.use(express.json());
routesApp(app);

app.listen(process.env.PORT, () =>
  console.log(`Server is running ${process.env.PORT}`)
);
