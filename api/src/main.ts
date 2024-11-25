import express from "express";

import { ItemsRouter } from "./routes/items";

const app = express();

const PORT = 5000;

app.use("/api/items", ItemsRouter);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
