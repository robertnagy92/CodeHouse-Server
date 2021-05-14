const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require('./auth.routes');
router.use("/", authRoutes);

const postRoute = require('./post.routes')
router.use("/posts", postRoute)

module.exports = router;
