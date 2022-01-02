const service = require("../services/comment.services.js");


exports.create = async (req, res) =>{
    try {
        const newComment = await service.create(req.params.articleId, req.body);

        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.update = async (req, res) =>{
    try {
        const updatedComment = await service.update(req.params.id, req.body);

        res.status(200).json(updatedComment);
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
        const comment = await service.findById(req.params.id);

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

