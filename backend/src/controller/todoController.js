const { todo } = require("../repository/db");

const createTodo = async (todoReq) => {
  const res = await todo.create({
    title: todoReq.title,
    description: todoReq.description,
    completed: false,
  });
  return res;
};

const updateTodo = async (id) => {
  const res = await todo.updateOne(
    {
      _id: id,
    },
    {
      completed: true,
    }
  );
  //   {
  //     acknowledged: true,
  //     modifiedCount: 1,
  //     upsertedId: null,
  //     upsertedCount: 0,
  //     matchedCount: 1
  //   }
  console.log(res);
  return res;
};

const getAllTodos = async () => {
  const todos = await todo.find({});
  console.log(todos);
  return todos;
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
};
