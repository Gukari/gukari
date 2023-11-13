const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userAccount = new Schema({
    username:{
        type:String
    },
    photourl:{
        type:String,
    }
    
})