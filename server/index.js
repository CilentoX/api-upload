import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import "./database/mongo.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/uploads"));
app.use(cors());
app.use(bodyParser.json());
configDotenv();

const port = process.env.PORT || 3000;
const baseRoute = "/api/v1";

import pingRoute from "./routes/pingRoute.js";
import fileRoutes from "./routes/fileRoutes.js";


app.use(baseRoute, pingRoute);
app.use(baseRoute, fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Access the API at http://localhost:${port}`);
});
