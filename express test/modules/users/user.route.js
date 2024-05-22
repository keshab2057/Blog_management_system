const router = require("express").Router();
const UserController = require("./user.controller");
const { validate, resetvalidation, uservalidation, loginvalidation } = require("./user.validator");

const { checkRole } = require("../../utils/sessionManager");

//ADMIN ROUTES
router.get("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    //user search,filter,limit
    const {page,limit,name,roles} = req.query;
    const search = {name,roles};
    const result = await UserController.list(search,page,limit);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/", validate, checkRole, async (req, res, next) => {
  try {
    const data = req.body;
    const result = await UserController.create(data);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/reset-password",
  resetvalidation,
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      const result = await UserController.resetPassword(req.body);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

//user ROUTE or public ROUTE
router.post("/register", validate, async (req, res, next) => {
  try {
    const result = await UserController.register(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/login",loginvalidation, async (req, res, next) => {
  try {
    const result = await UserController.login(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await UserController.generateFPToken(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await UserController.verifyFPToken(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/change-password",
  checkRole(["user"]),
  async (req, res, next) => {
    try {
      const result = await UserController.changePassword(req.body);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/get-profile", checkRole(["user"]), async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) throw new Error("User id is required");
    const result = await UserController.getProfile(userId);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/update-profile",
  uservalidation,
  checkRole(["user"]),
  async (req, res, next) => {
    try {
      const { userId, ...rest } = req.body;
      if (!userId) throw new Error("User ID is required");
      const result = await UserController.updateProfile(userId, rest);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", checkRole(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserController.getById(id);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validate, checkRole(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await UserController.updateById(id, data);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkRole(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserController.deleteById(id);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
