const roles_list = require("../config/roles_list");

/**
 * @param {*type:number} allowedRoles
 * @usage insert allowed role in roles_list
 * @returns
 *user roles
 */
const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(407);
    // const result = req.roles.includes(allowedRoles);

    const result =
      req.roles[allowedRoles] === roles_list[allowedRoles] ? true : false;
    if (!result) return res.sendStatus(408);

    next();
  };
};

module.exports = verifyRoles;
