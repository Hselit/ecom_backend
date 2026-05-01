import LibsTypes from "./types/libsType.js";
import RoleTypes from "./types/roleType.js";
import UserTypes from "./types/userType.js";
import LoginTypes from "./types/loginType.js";
import AccessTypes from "./types/accessType.js";
import AccessRoleTypes from "./types/accessRoleType.js";
import CategoryTypes from "./types/categoryType.js";
import ProductTypes from "./types/productType.js";
import ProductImageTypes from "./types/productImageType.js";
import CartTypes from "./types/cartType.js";
import OrderTypes from "./types/orderType.js";
import ReviewTypes from "./types/reviewType.js";
import InventoryTypes from "./types/inventoryType.js";

const TYPES = {
  ...LibsTypes,
  ...UserTypes,
  ...RoleTypes,
  ...LoginTypes,
  ...AccessTypes,
  ...AccessRoleTypes,
  ...CategoryTypes,
  ...ProductTypes,
  ...ProductImageTypes,
  ...CartTypes,
  ...OrderTypes,
  ...ReviewTypes,
  ...InventoryTypes
}

export default TYPES;