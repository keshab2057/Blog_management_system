const router = require("express").Router();

const blogRouter = require("../modules/blogs/blog.route");
// const roleRouter = require("../modules/roles/role.route");
// const tagRouter = require("../modules/tags/tag.route");
const userRouter = require("../modules/users/user.route");


const apiVersion = "/api/v1";

router.use(`${apiVersion}/blogs`,blogRouter);
// router.use(`${apiVersion}/roles`,roleRouter);
// router.use(`${apiVersion}/tags`,tagRouter);
router.use(`${apiVersion}/users`,userRouter);



module.exports = router;