const service = require("../services/article.services.js");

exports.index = async(req, res) =>{
    try {
        const articles = await service.index(req.query);

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.create = async (req, res) =>{
    try {
        const newArticle = await service.create(req.body);

        res.status(200).json(newArticle);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.update = async (req, res) =>{
    try {
        const updatedArticle = await service.update(req.params.id, req.body);

        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.delete = async (req, res) =>{
    try {
        await service.delete(req.params.id);

        res.status(200).json({ message: "Delete Success" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.findById = async (req, res) =>{
    try {
        const article = await service.findById(req.params.id);

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

