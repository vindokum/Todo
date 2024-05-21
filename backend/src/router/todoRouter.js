const express = require("express");
const {
  createTodo: createTodoType,
  updateTodo: updateTodoType,
} = require("../validator/types");
const {
  getAllTodos,
  createTodo,
  updateTodo,
} = require("../controller/todoController");

const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message ?? "unknown error occured" });
  }
});

router.post("/todo", async (req, res) => {
  const createPayload = req.body;
  //   {
  //     success: true,
  //     data: {
  //       title: 'create a todo backend apis',
  //       description: 'create a todo backend apis for create, update to complete and get all todos'
  //     }
  //   }
  const parsedPayload = createTodoType.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong input",
    });
    return;
  }
  try {
    await createTodo(createPayload);
    res.json({
      msg: "todo created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.message ?? "unknown error",
    });
  }
  return;
});

router.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodoType.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong input",
    });
    return;
  }
  try {
    await updateTodo(req.body.id);
    res.json({
      msg: "todo marked as completed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unknown error occured" });
  }
});

module.exports = {
  todoRouter: router,
};
