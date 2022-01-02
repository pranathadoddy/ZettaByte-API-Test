const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    article:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Comment", CommentSchema);