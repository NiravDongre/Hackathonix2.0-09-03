const Todo = require("../models/todo.model")

exports.createTodo = async(req,res)=>{

    const {title} = req.body

    const todo = await Todo.create({
        title,
        userid:req.userid
    })

    res.json(todo)
}


exports.getTodos = async(req,res)=>{

    const todos = await Todo.find({
        userid:req.userid
    })

    res.json(todos)
}


exports.updateTodo = async(req,res)=>{

    const id = req.params.id

    const {title,complete} = req.body

    const todo = await Todo.findByIdAndUpdate(
        id,
        {title,complete},
        {new:true}
    )

    res.json(todo)
}


exports.deleteTodo = async(req,res)=>{

    const id = req.params.id

    await Todo.findByIdAndDelete(id)

    res.json({message:"Todo deleted"})
}