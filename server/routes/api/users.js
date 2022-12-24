const express = require("express");
const router = express.Router();
const roles_list = require("../../config/roles_list");
const verifyJwtToken = require("../../middlewares/verifyJwtToken");
const verifyRoles = require("../../middlewares/verifyRoles");

const userController = require("../../controllers/auth/userController");
const refreshTokenController = require("../../controllers/auth/refreshTokenController");

router
  .route("/user")
  .get(verifyJwtToken, verifyRoles("admin"), userController.getPaginationUserList)
  .delete(verifyJwtToken, verifyRoles("admin"), userController.deleteUser);

router
.route("/alluser")
.get(verifyJwtToken, verifyRoles("admin"), userController.getAllUsers)

router
  .route("/user/role")
  .patch(verifyJwtToken, verifyRoles("admin"), userController.changeUserRole);

router.route("/user/refresh").get(refreshTokenController.handleRefreshToken);

module.exports = router;
