import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = header.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // only user id store kar rahe hain
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
