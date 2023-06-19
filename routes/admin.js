const router = require("express").Router();

router.post("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "Acceso concendido a ruta protegida /admin.",
      user: req.user,
    },
  });
});

module.exports = router;
