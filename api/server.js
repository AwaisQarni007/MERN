const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apps = express();
// import { Todo  } from "./models/Todo";

apps.use(express.json());
apps.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    // mongodb+srv://muhammadawais:<password>@cluster0.fiu5izn.mongodb.net/
mongoose.connect("mongodb+srv://muhammadawais:B_J!e.NX39Uw9_P@cluster0.fiu5izn.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4

})
    .then(() => console.log("Connected To DB"))
    .catch(console.error)




const Todo = require('./models/Todo');
apps.get('/todos/', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);

});
apps.get('/todos/:id', async (req, res) => {
    const todos = await Todo.findById(req.params.id);

    res.json(todos);

});


apps.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        Name: req.body.name,
        Degree: req.body.degree,
        University: req.body.university,
    });

    todo.save();
    res.json(todo);
});

apps.put('/todo/edit/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
        Name: req.body.name,
        Degree: req.body.degree,
        University: req.body.university,
      }, { new: true }); // Adding { new: true } returns the updated document
  
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
apps.delete('/todo/delete/:id',async (req, res) => {
    
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});
apps.put('/todo/complete/:id',async (req, res) => {
    
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
     todo.save();
    res.json(todo);
});


apps.listen(3001, () => console.log("Server started on port 3001"))



