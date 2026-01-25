import LibsTypes from "./types/libsType.js";
import RoleTypes from "./types/roleType.js";
import UserTypes from "./types/userType.js";
import LoginTypes from "./types/loginType.js";
import AccessTypes from "./types/accessType.js";
import AccessRoleTypes from "./types/accessRoleType.js";

const TYPES = {
  ...LibsTypes,
  ...UserTypes,
  ...RoleTypes,
  ...LoginTypes,
  ...AccessTypes,
  ...AccessRoleTypes
}

export default TYPES;