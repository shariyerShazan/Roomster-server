import jwt from "jsonwebtoken";

const isAuthed = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.id = decoded.id;

    next();
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(401).json({ message: "User not authenticated" });
  }
};

export default isAuthed;

