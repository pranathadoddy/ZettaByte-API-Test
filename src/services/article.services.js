const Article = require("../models/article.model.js");
const Comment = require("../models/comment.model.js");

exports.create = async (articleData) => {

    try {

        const article = new Article({
            title: articleData.title,
            description: articleData.description
        });

        const newArticle = await article.save();
        return newArticle;
    } catch (error) {
        throw error;
    }
}

exports.update = async (id, articleData) => {

    try {
        const article = await Article.findById(id);
        if(!article){
            return null;
        }

        const updatedArticle = await Article.findByIdAndUpdate(id,
            {
              $set: articleData,
            },
            { new: true });

        return updatedArticle;

    } catch (error) {
        throw error;
    }
}

exports.delete = async (id) => {

    try {
        const article = await Article.findById(id);

        if(article.comments.length !== 0){
            const commentIds = article.comments.map(item=> item.toString());
            await Comment.deleteMany({ _id: { $in: commentIds } })
        }

        await article.delete();

        return true;
    } catch (error) {
        throw error;
    }
}

exports.findById = async (id) =>{
    try {
        const article = await Article.findById(id);
        return article;
    } catch (error) {
        throw error;
    }
}

exports.index = async (query) =>{
    let aggregate_options = [];
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 5;

    const options = {
        page, limit,
        collation: {locale: 'en'},
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'articles'
        }
    };

    let match = {};

    if (query.q) match.title = {$regex: query.q, $options: 'i'};
    aggregate_options.push({$match: match});

    let sortOrder = query.sort_order && query.sort_order === 'desc' ? -1 : 1;
    aggregate_options.push({$sort: {"data.start_date": sortOrder}});

    const myAggregate = Article.aggregate(aggregate_options);
    const result = await Article.aggregatePaginate(myAggregate, options);

    return result;
}

