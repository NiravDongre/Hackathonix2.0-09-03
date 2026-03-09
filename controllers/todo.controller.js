const Todo = require("../models/todo.model")
const sortTodos = require("../utils/sortTodos")
const predictPriority = require("../utils/priorityPredictor")
const todoSchema = require("../schema/todo.schema")
const AppError = require("../utils/AppError")

exports.createTodo = async(req,res,next)=>{

    try{

    const result = todoSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            error: result.error.errors
        })
    }

    const {title,deadline} = result.data

    const priority = predictPriority(title,deadline)

    const todo = await Todo.create({
        title,
        deadline,
        priority,
        userid:req.userid
    })

    res.status(201).json(todo)
}catch(err){
    next(err)
}
}



exports.getTodos = async(req,res,next)=>{

    try{
    const todos = await Todo.find({
        userid:req.userid
    })

    if(!todos || todos.length === 0){
        return res.json([])
    }

    const sortedTodos = sortTodos(todos)

    res.json(sortedTodos);

}catch(err){
    next(err)
}
}

exports.updateTodo = async(req,res,next)=>{

    try{
    const id = req.params.id

     if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new AppError("Invalid todo id", 400)
    }

    const {title,complete} = req.body

    const updates = {}
    if (typeof title !== "undefined") updates.title = title
    if (typeof complete !== "undefined") updates.complete = complete


    const todo = await Todo.findByIdAndUpdate(
        id,
        updates,
        {new:true}
    )

    res.json(todo)
}catch(err){
    next(err)
}
}


exports.deleteTodo = async(req,res,next)=>{

    try{
    const id = req.params.id;

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new AppError("Invalid input", 400)
    }

    const deleted = await Todo.findByIdAndDelete(id)

    if(!deleted){
        throw new AppError("Todo not found", 404)
    }

    res.json({message:"Todo deleted"});

    }catch(err){
        next(err)
    }

}