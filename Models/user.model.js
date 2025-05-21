import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL : {
    type: String,
    default: 'https://i.ibb.co/2FxSxKk/default-user.png'
  },
  role: {
    type: String,
    enum:  ['user', 'admin'],
    default: 'user'
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
