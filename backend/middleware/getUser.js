/* eslint-disable no-undef */
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // * defined secret for jsonwebtoken
function getUser(req, res, next) {
  let token = req.header("auth-token") || req.cookies["auth-token"];
  if (!token) {
    // * in case when token is not present
    res
      .status(401)
      .json({ success: false, error: "Access denied from server!" }); // ! sending error
  } else {
    // * in case when token is present
    JWT.verify(token, JWT_SECRET, (err, response) => {
      // * verifying token
      if (err) {
        // * in case when token is tempered or not valid
        res.status(403).json({
          status: false,
          error: "Token is not valid!"
        }); // ! sending error
      } else {
        // * in case when token is valid
        req.user = response; // * sending response
        next();
      }
    });
  }
}
export default getUser;
