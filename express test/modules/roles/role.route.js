const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "hello from get role router" });
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    //database call
    res.json({ msg: "hello from post role route" });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log({ id, data });
    res.json({ msg: "hello from put role route" });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log({ id, data });
    res.json({ msg: "hello from patch role route" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `blog id ${id} is deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
