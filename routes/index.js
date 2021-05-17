const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require('./auth.routes');
router.use("/", authRoutes);

// const postRoute = require('./posts.routes')
// router.use("/posts", postRoute)

const userRoute = require('./users.routes')
router.use("/", userRoute)

module.exports = router;
