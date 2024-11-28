import express from "express";
import cors from "cors";

import { ItemsRouter } from "./routes/items";

const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use("/api/items", ItemsRouter);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
