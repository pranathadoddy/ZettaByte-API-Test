const Article = require("../models/article.model.js");
const Comment = require("../models/comment.model.js");


exports.create = async (articleId, commentData) => {

    try {

        const comment = new Comment({
            userName: commentData.userName,
            comment: commentData.comment,
            article: articleId
        });

        const newComment = await comment.save();

        await Article.findByIdAndUpdate(articleId, {
            $push:{
                comments: newComment._id
            }
        },
        {
            new: true
        });

        return newComment;
    } catch (error) {
        throw error;
    }
}

exports.update = async (id, commentData) => {

    try {
        const comment = await Comment.findById(id);
        if(!comment){
            return null;
        }

        const updatedComment = await Comment.findByIdAndUpdate(id,
            {
              $set: commentData,
            },
            { new: true });

        return updatedComment;

    } catch (error) {
        throw error;
    }
}

exports.delete = async (id) => {

    try {
        const comment = await Comment.findById(id);
        
        await Article.findByIdAndUpdate(comment.article, {
            $pull: {
                comments: comment._id
            }
        },{
            new: true
        });

        await comment.delete();

        return true;
    } catch (error) {
        throw error;
    }
}

exports.findById = async (id) =>{
    try {
        const comment = await Comment.findById(id);
        return comment;
    } catch (error) {
        throw error;
    }
}