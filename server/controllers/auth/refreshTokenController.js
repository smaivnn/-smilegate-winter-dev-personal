const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(400);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  const foundUser = await User.findOne({ refreshToken });

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      // refreshToken expires
      if (err) {
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        return res
          .status(406)
          .json({ success: false, message: `refresh token expires` });
      }

      if (err || foundUser._id.toString() !== decoded._id) {
        return res.sendStatus(403);
      }

      // const roles = Object.values(foundUser.roles);
      // RefreshToken was still valid
      const accessToken = jwt.sign(
        {
          roles: foundUser.roles,
          _Id: foundUser._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const newRefreshToken = jwt.sign(
        {
          _id: foundUser._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "20m" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = newRefreshToken;
      const result = await foundUser.save();

      // Create Secure Cookie with refreshToken
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      }); //secure: true,

      res.status(200).json({ success: true, accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
