const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create new Blog
router.post("/", async (req, res)=>{
   const newPost = new Post(req.body);
   try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);

   }catch(err){res.status(500).json(err)}

   
} );


//Update the blog

router.put("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
        try{

            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});
            res.status(200).json(updatedPost);
        }catch(err){res.status(500).json(err)}

    }
    else{
res.status(401).json("You can update only your blog");
    }
}catch(err){
        res.status(500).json(err);
}
      
});

//delete the blog

router.delete("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
        try{

     await post.delete();
            res.status(200).json("Blog is now deleted");
        }catch(err){res.status(500).json(err)}

    }
    else{
res.status(401).json("You can delete only your blog");
    }
}catch(err){
        res.status(500).json(err);
}
      
});


// GET Blog

router.get(":/id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    }
        catch (err) {
            res.status(500).json(err);
    }
});

// get all blogs 

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username})
        }
        else if(catName){
            posts = await Post.find({categories:{$in:[catName]}})
        }
        else 
        {
            posts = await Post.find();
        }
        res.status(200).json(posts);

    }
        catch (err) {
            res.status(500).json(err);
    }
});

module.exports = router;