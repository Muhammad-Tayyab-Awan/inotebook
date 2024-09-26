import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
function getUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ Error: "Access denied from server!" });
  } else {
    JWT.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Token is not valid!" });
      } else {
        req.user = user;
        next();
      }
    });
  }
}
export default getUser;
