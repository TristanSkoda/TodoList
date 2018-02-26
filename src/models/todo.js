const mongoose = require('mongoose')

const Schema = mongoose.Schema


const TodoSchema = new Schema({
    key: Number,
    data: { name: String, isDone: Boolean }
})

const Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo