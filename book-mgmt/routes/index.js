const router = require("express").Router();
const bookRouter = require("../modules/books/book.route");

const apiVersion = "/api/v1";


router.use(`${apiVersion}/books`,bookRouter);



module.exports = router;