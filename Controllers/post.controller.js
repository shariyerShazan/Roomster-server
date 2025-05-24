import Post from "../Models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const {
      title,
      roomPictureURL,
      location,
      rent,
      type,
      availabilityDate,
      description,
      lifestyle,
      contactNumber,
    } = req.body;
    
    const userId = req.params.id;

    if (
      !title ||
      !roomPictureURL ||
      !location ||
      !rent ||
      !type ||
      !availabilityDate ||
      !description ||
      !lifestyle ||
      !contactNumber
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const post = await Post.create({
      title,
      roomPictureURL ,
      location,
      rent : Number(rent),
      type,
      availabilityDate,
      description,
      lifestyle,
      contactNumber,
      createdBy: userId
    });
    return res.status(201).json({
      message: "Post created successfully",
      success: true ,
      post
    })
  } catch (error) {
    console.log(error);
  }
};






export const getAllPost = async (req , res)=>{
  try {
    const keyword = req.query.keyword || ""
    const query = {
      $or:[
        {title : {$regex: keyword , $options: 'i'}},
        {description : {$regex: keyword , $options: 'i'}}
      ]
    }
    const post = await Post.find(query)
   if(!post){
    return res.status(404).json({
      message : "Post not found",
      success : false
    })
   }
   return res.status(200).json({
      post ,
      success: true
   })


  } catch (error) {
    console.log(error)
  }
}





export const getPostById = async ( req , res )=>{
  try {
      const postId = req.params.id
       const post = await Post.findById(postId)
       if(!post){
        return res.status(404).json({
          message : "Post not found",
          success : false
        })
       }
       return res.status(200).json({
        post ,
        success: true
     })

  } catch (error) {
    console.log(error)
  }
}





export const getAdminPost = async (req , res)=>{
  try {
      //  const adminId = req.id
      const adminId = req.params.id
       const post = await  Post.find({createdBy : adminId})
       if(!post){
        return res.status(404).json({
          message : "Post not found",
          success : false
        })
       }
       return res.status(200).json({
        post ,
        success: true
     }) 

  } catch (error) {
    console.log(error)
  }
}



export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    // const userId = req.id;
   

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // if (post.createdBy.toString() !== userId) {
    //   return res.status(403).json({
    //     message: "You are not authorized to update this post",
    //     success: false,
    //   });
    // }

    const updatedData = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
  }
};







export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    // const userId = req.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // if (post.createdBy.toString() !== postId) {
    //   return res.status(403).json({
    //     message: "You are not authorized to delete this post",
    //     success: false,
    //   });
    // }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const updateLike = async (req, res) => {
  try {
    const { action } = req.body; 
    const postId = req.params.id;


    if (!action || !["like", "unlike"].includes(action)) {
      return res.status(400).json({ 
        message: "Invalid action. Use 'like' or 'unlike'",
        success: false 
      });
    }

    const update = action === "like" 
      ? { $inc: { like: 1 } } 
      : { $inc: { like: -1 } }; 

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      update,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ 
        message: "Post not found",
        success: false 
      });
    }

    res.status(200).json({ 
      message: `Post ${action}d successfully`, 
      post: updatedPost,
      success: true 
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message, 
      success: false 
    });
  }
};