const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  if (id && typeof id !== "string")
    return res
      .status(401)
      .send({ success: false, message: "id must be String" });
  if (password && typeof password !== "string")
    return res
      .status(401)
      .send({ success: false, message: "password must be String" });

  // checking matched user on DB
  const foundUser = await User.findOne({ id });
  // if unmatched, Unauthorized
  if (!foundUser)
    return res
      .status(204)
      .json({ success: false, message: `$user ${id} not found` });

  // compare(evaluate) password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // get User roles
    // const roles = Object.values(foundUser.roles);

    // create JWTs access token
    // sign(payload : information to post in token, secretOrPrivateKey, [option,callback])
    const accessToken = jwt.sign(
      {
        roles: foundUser.roles,
        _id: foundUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    // create JWTs refresh token
    const refreshToken = jwt.sign(
      {
        _id: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "20m" }
    );

    // Saving refreshToken with current user(support multple login)
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Create Secure Cookie with refreshToken
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 86400초(하루)
      secure: true,
    }); //secure: true,

    // Send access token to user
    res.status(201).json({ success: true, accessToken });
  } else {
    res.status(500).json({ success: false });
  }
};

module.exports = { handleLogin };
