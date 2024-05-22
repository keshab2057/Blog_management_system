const { verifyJWT } = require("./token");
const UserModel = require("../modules/users/user.model");

const checkRole = (sysRole) => {
  return async (req, res, next) => {
    const { access_token } = req.headers || "";
    if (!access_token) throw new Error("Access Token is Required");
    const  {data}  = verifyJWT(access_token);
    if(!data) throw new Error("token Expired");
    const isValidRole = sysRole.some((role) => data.role.includes(role));
    if (!isValidRole) throw new Error("Permission Denied");
    const { role, email } = data;
    //user ID
    const user = await UserModel.findOne({ email });
    req.body.author = role.includes("user")
      ? user._id.toString()
      : req.body.author;
    next();
  };
};


//author automatic
//1.blog validation author required
//2.blog route=> add checkRole["admin","user"]=>mw order(checkRole,validate)
//3.sessionManager ma destructor roles and email from valid data
//4.find user id from user email using userModel
//5.if user,req.body.author=>role(user)?put userId:req.body.author
module.exports = { checkRole };
