const express = require("express");
const storage = require("../config/cloudinary");
const {
  userRegister,
  users,
  userLogin,
  userProfile,
  updateUser,
  profilePhotoUpload,
  whoViewedMyProfile,
  following,
  blockUsers,
  unFollow,
  unblockUser,
  adminBlockUser,
  adminUnblockUser,
  updatePassword,
  deleteUserAccount,
} = require("../controllers/userController");
const isLogin = require("../middlewares/isLogin");
const multer = require("multer");
const isAdmin = require("../middlewares/isAdmin");
const userRouter = express.Router();

//instance of multer
const upload = multer({ storage });

//POST/api/v1/users/register
userRouter.post("/register", userRegister);

//POST/api/v1/users/login
userRouter.post("/login", userLogin);

//GET/api/v1/users
userRouter.get("/", users);

//GET/api/v1/users/profile/:id
userRouter.get("/profile/", isLogin, userProfile);

//PUT/api/v1/users/:id
userRouter.put("/", isLogin, updateUser);

//GET/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfile);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, following);

//GET/api/v1/users/unfollow/:id
userRouter.get("/unfollowing/:id", isLogin, unFollow);

//GET/api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockUsers);

//GET/api/v1/users/unblock/:id
userRouter.get("/unblock/:id", isLogin, unblockUser);

//PUT/api/v1/users/unblock/:id
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUser);

//PUT/api/v1/users/unblock/:id
userRouter.put("/admin-unblock/:id", isLogin, isAdmin, adminUnblockUser);

//PUT/api/v1/users/unblock/:id
userRouter.put("/update-password", isLogin, updatePassword);

//DELETE/api/v1/users/unblock/:id
userRouter.delete("/delete-account", isLogin, deleteUserAccount);

//POST/api/v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUpload
);
module.exports = userRouter;
