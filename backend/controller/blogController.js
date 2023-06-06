const Blog = require('../model/Blog');

exports.add=(req,res)=>{


    const newBlog=new Blog({
        title:req.body.title,
        content:req.body.content,
        url:req.body.url,
        likes:req.body.likes,
        watches:req.body.watches,
        poster: req.body.poster,
        created_at: req.body.created_at,
    })
    newBlog.save()
        .then((res) => console.log(res));
}

exports.update=(req,res)=>{
    Blog.findOneAndUpdate({created_at : req.body.created_at}, {content: req.body.content, title: req.body.title, url: req.body.url})
        .then(res=> console.log(res))
        // .catch(err=>{return res.status(400).json(err)});
}

exports.updateLikes=(req, res) => {
    Blog.findOneAndUpdate({created_at : req.body.created_at}, {likes: req.body.likes})
        .then(res=> console.log(res))
        // .catch(err=>{return res.status(400).json(err)});
}

exports.updatewath=(req, res) => {
    Blog.findOneAndUpdate({created_at : req.body.created_at}, {watches: req.body.watches})
        .then(res=> console.log(res))
        // .catch(err=>{return res.status(400).json(err)});
}