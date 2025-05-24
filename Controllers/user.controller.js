import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, photoURL, role } = req.body;
    if (!name || !email || !password || !photoURL || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
        success: false,
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase and one lowercase letter",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hassedPassword = await bcrypt.hash(password, 10);
    const CreateedUser = {
      name,
      email,
      password: hassedPassword,
      photoURL,
      role,
    };

    const tokenData = {
      userId: user?._id ,
    };
    // error?
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    await User.create(CreateedUser);

    return res.status(201).json({
      message: "Account created successfully",
      user :  CreateedUser,
     token ,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist in this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    // error?
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        token,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.logout = async (req, res) => {
//   res.clearCookie("token").json({ message: "Logged out successfully" });
// };

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, photoURL, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (name) user.name = name;
    if (photoURL) user.photoURL = photoURL;

    if (oldPassword && newPassword) {
      const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordMatched) {
        return res.status(400).json({
          message: "Old password is incorrect",
          success: false,
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
