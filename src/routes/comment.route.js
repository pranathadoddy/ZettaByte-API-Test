
const commentSchema = require("../controllers/comment.controller.js");

module.exports = (app) =>{

    app.post("/api/comment/:articleId", commentSchema.create);
    app.put("/api/comment/:id", commentSchema.update);
    app.delete("/api/comment/:id", commentSchema.delete);
    app.get("/api/comment/:id", commentSchema.findById);
    
}