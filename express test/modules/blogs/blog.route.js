const router = require("express").Router();
const BlogController = require("./blog.controller");
const { validate } = require("./blog.validator");
const { checkRole } = require("../../utils/sessionManager");

router.get("/", async (req, res, next) => {
  try {
    const {author,title,page,limit} = req.query;
    const search = {author,title}
    const result = await BlogController.list(author,page,limit,search);
    //Database call
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.get("/publishedOnly", async (req, res, next) => {
  try {
    const { author, page, limit } = req.query;
    //Database call
    const result = await BlogController.getPublishedBlogOnly(author, page, limit);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.get("/authors", async (req, res, next) => {
  try {
    //Database call
    const { author, page, limit } = req.query;
    if (!author) throw new Error("Author Missing");
    const result = await BlogController.getAuthorBlogs(author, page, limit);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogController.getById(id);
    //Database call
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkRole(["admin", "user"]),

  validate,
  async (req, res, next) => {
    try {
      const data = req.body;
      const result = await BlogController.create(data);
      //Database call
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id", validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await BlogController.updateById(id, data);
    //Database call
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await BlogController.updateById(id, data);
    //Database call
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogController.deleteById(id);
    //Database call
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
