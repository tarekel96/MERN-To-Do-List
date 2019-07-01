const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res
      .status(401)
      .json({ Msg: "No token, unauthorized user", status: "401" });

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.jwtsecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      Msg: "Token is not valid"
    });
  }
}

module.exports = auth;
