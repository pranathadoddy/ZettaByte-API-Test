
const articleSchema = require("../controllers/article.controller.js");

module.exports = (app) =>{

    app.post("/api/article", articleSchema.create);
    app.put("/api/article/:id", articleSchema.update);
    app.delete("/api/article/:id", articleSchema.delete);
    app.get("/api/article/:id", articleSchema.findById);
    app.get("/api/article", articleSchema.index);
}