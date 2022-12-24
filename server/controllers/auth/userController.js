const User = require("../../models/User");
const roles_list = require("../../config/roles_list");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    if (!allUser) return res.status(204);
    res.status(201).json({ success: true, allUser });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.body?.id)
      return res
        .status(400)
        .json({ success: false, message: "User ID required" });
    if (typeof req.body.id !== "string")
      return res
        .status(401)
        .send({ success: false, message: "id must be String" });

    const foundUser = await User.findOne({ id: req.body.id });
    if (!foundUser) {
      return res
        .status(204)
        .json({ message: `User ID ${req.body.id} not found` });
    }

    const result = await User.deleteOne({ id: req.body.id });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const changeUserRole = async (req, res) => {
  let userRoles = {};
  try {
    const { id, roles } = req.body;
    if (!id || !roles)
      return res
        .status(400)
        .json({ success: false, message: "id, roles are required" });
    if (typeof id !== "string")
      return res
        .status(401)
        .send({ success: false, message: "id must be String" });

    const foundUser = await User.findOne({ id });
    if (!foundUser)
      return res
        .status(204)
        .json({ message: `User ID ${req.body.id} not found` });

    roles.map((element, idx) => {
      userRoles[element] = roles_list[element];
    });
    foundUser.roles = userRoles;
    const result = await foundUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getPaginationUserList = async (req, res) => {
  try {
    let { page = 0, itemPerPage = 3 } = req.query;
    if (typeof parseInt(page) !== "number")
      return res
        .status(401)
        .send({ success: false, message: "page must be number" });

    page = parseInt(page);
    itemPerPage = parseInt(itemPerPage);
    const foundUser = await User.find(
      {},
      { password: 0, refreshToken: 0, notification: 0 }
    )
      .sort({ createdAt: -1 })
      .skip(page * itemPerPage)
      .limit(itemPerPage);

    const allUserCount = await User.find().count();

    return res.status(201).json({ success: true, foundUser, allUserCount });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
module.exports = {
  getAllUsers,
  deleteUser,
  changeUserRole,
  getPaginationUserList,
};
