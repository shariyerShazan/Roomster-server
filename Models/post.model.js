

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true, 
    trim: true
  },
  roomPictueURL:{
      type: String ,
      required: true
  },
  location: {
    type: String,
    required: true, 
  },
  rent: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['Family', 'Bachelor', 'Sublet'],
    required: true, 
  },
  availabilityDate: {
    type: String,
    enum: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    required: true
  }, 
  description: {
    type: String,
    required: true, 
  },
  lifestyle: {
    type : String ,
    required : true
  },
  contactNumber : {
    type: String ,
    required: true
  },
  createdBy: {
    type: String ,
    required: true,
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;
