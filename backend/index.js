const express = require("express");
const { todoRouter } = require("./src/router/todoRouter");

const app = express();

app.use(express.json());

app.use(todoRouter);

app.listen(3000, () => {
  console.log("server started at 3000");
});
