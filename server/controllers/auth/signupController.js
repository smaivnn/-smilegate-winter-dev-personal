const User = require("../../models/User");
const bcrypt = require("bcrypt");

const handleSignupNewUser = async (req, res) => {
  try {
    const { id, password, name, nickname, email } = req.body;

    if (!id || !password || !name || !nickname || !email)
      return res.status(400).send({
        success: false,
        message: "id, password, name, nickname, email is required",
      });
    if (id && typeof id !== "string")
      return res
        .status(401)
        .send({ success: false, message: "id must be String" });
    if (password && typeof password !== "string")
      return res
        .status(401)
        .send({ success: false, message: "password must be String" });
    if (name && typeof name !== "string")
      return res
        .status(401)
        .send({ success: false, message: "name must be String" });
    if (nickname && typeof nickname !== "string")
      return res
        .status(401)
        .send({ success: false, message: "nickname must be String" });
    if (email && typeof email !== "string")
      return res
        .status(401)
        .send({ success: false, message: "email must be String" });

    const duplicate = await User.findOne({ id });
    if (duplicate)
      return res.status(409).json({ success: false, message: `duplicate id` });

    const hashedPwd = await bcrypt.hash(password, 10);

    // admin권한 부여를 위한 roles, 추후 삭제
    const roles = {
      admin: 5150,
    };
    const result = await User.create({
      id,
      password: hashedPwd,
      name,
      nickname,
      email,
      roles,
    });

    res.status(201).json({
      success: true,
      message: `new user ${id} created`,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = { handleSignupNewUser };
