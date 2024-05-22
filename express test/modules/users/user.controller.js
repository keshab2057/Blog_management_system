const UserModel = require("./user.model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { mailer } = require("../../services/mailer");
const { signJWT, generateSixDigitToken } = require("../../utils/token");

const create =  (payload) => {
  return UserModel.create(payload);
};

const list = async(search, page = 1, limit = 3) => {
  const query = [];
  //searching
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search.name, "gi"),
      },
    });
  }

  if (search?.roles) {
    query.push({
      $match: {
        roles: [search.roles],
      },
    });
  };

  //sorting
  query.push({
    
    $sort: {
      createdAt: 1,
    },
  });
  //pagination
query.push(
  {
    $facet: {
      metadata: [
        {
          $count: "total",
        },
      ],
      data: [
        {
          $skip: (+page - 1)* +limit,
        },
        {
          $limit: +limit,
        },
      ],
    },
  },
  {
    $addFields: {
      total: {
        $arrayElemAt: ["$metadata.total", 0],
      },
    },
  },
  {
    $project: {
      data: 1,
      total: 1,
    },
  },
  {
    $project: {
      "data.password": 0,
    },
  },
)
  // return UserModel.find();
 const result = await UserModel.aggregate(query);
 return {
  data:result[0].data,
  total:result[0].total || 0,
  page:+page,
  limit:+limit,
 };
};

const getById = (_id) => {
  return UserModel.findOne({ _id });
};

const updateById = (_id, payload) => {
  return UserModel.updateOne({ _id }, payload);
};

const deleteById = (_id) => {
  return UserModel.deleteOne({ _id });
};

const register = async (payload) => {
  const { password } = payload;
  if (!password) throw new Error("password field is missing");
  payload.password = hashPassword(payload.password);
  // console.log(payload);
  const user = await UserModel.create(payload);
  if (!user) throw new Error("User Registration Failed");
  const mail = await mailer(
    user.email,
    "User Registration",
    "User Registration completed"
  );
  if (mail) return "User Registration completed";
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("email or password is missing");
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new Error("user doesn't exist");
  const { password: hashPassword } = user;
  const result = comparePassword(password, hashPassword);
  if (!result) throw new Error("Email or Password missmatch");
  // return "User logged in successfully";
  //return access token
  const userPayload = { name: user.name, email: user.email, role: user.roles };
  const token = signJWT(userPayload);
  return token;
};

const generateFPToken = async (payload) => {
  const { email } = payload;
  if (!email) throw new Error("email does not found");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user does not exist");

  //generate otp
  const token = generateSixDigitToken();
  //store the otp in the model
  await UserModel.updateOne({ _id: user._id }, { token });
  //send the otp in the email
  await mailer(email, "Forget password Token", `you reset token is ${token}`);
  return "token sent to email";
};

const verifyFPToken = async (payload) => {
  const { token, email, password } = payload;
  if (!token || !email || !password) throw new Error("something missing");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user does not exist");
  if (token !== user.token) throw new Error("Invalid token");
  const updatedUser = await UserModel.updateOne(
    { email },
    { password: hashPassword(password), token: "" }
  );
  if (!updatedUser) throw new Error("Password update Failed");
  return "password changed successfully";
};

const resetPassword = async (payload) => {
  const { userId, password } = payload;
  if (!userId || !password) throw new Error("User or Password missing");
  const user = await UserModel.findOne({ _id: userId });
  if (!user) throw new Error("User not found");
  await UserModel.updateOne(
    { _id: user._id },
    { password: hashPassword(password) }
  );
  return "password reset successfully";
};

const changePassword = async (payload) => {
  const { oldPassword, newPassword, userId } = payload;
  if (!oldPassword || !newPassword || !userId)
    throw new Error("something is missing");
  const user = await UserModel.findOne({ _id: userId }).select("+password");
  if (!user) throw new Error("User not found");
  const isValidOldPw = comparePassword(oldPassword, user.password);
  if (!isValidOldPw) throw new Error("password didn't match");
  await UserModel.updateOne(
    { _id: user._id },
    { password: hashPassword(newPassword) }
  );
  return "Password change successfully";
};

const getProfile = (userId) => {
  return UserModel.findOne({ _id: userId });
};

const updateProfile = async (userId, payload) => {
  const user = await UserModel.findOne({ _id: userId });
  if (!user) throw new Error("User not found");
  await UserModel.updateOne({ _id: user._id }, payload);
  return "profile updated successfully";
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
  register,
  login,
  generateFPToken,
  verifyFPToken,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
};
