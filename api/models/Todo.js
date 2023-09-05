const mongoose = require('mongoose');


const schema = mongoose.Schema;

const TodoSchema = new schema ({
    text : {
        type:String,
        required:true,
        default:""
    },
    Name : {
        type:String,
        required:true,
        default:""
    },
    Degree : {
        type:String,
        required:true,
        default:""
    },
    University : {
        type:String,
        required:true,
        default:""
    },
    complete :{
        type:Boolean,
        default:false,
    },
    timestamp :{
        type:String,
        default:Date.now(),
    }
})

const Todo = mongoose.model("Todo",TodoSchema)
module.exports = Todo;