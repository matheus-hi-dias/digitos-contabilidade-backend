import express from "express";
import { router } from "./routes/index.js";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}. http://localhost:${port}`);
});
