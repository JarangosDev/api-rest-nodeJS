const router = require("express").Router();
const User = require("../models/User");
const schemaRegister = require("../validations/registerValidation");
const schemaLogin = require("../validations/loginValidation");
const bcrytp = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //Encriptar contraseña
  const salts = await bcrytp.genSalt(10);
  const passwordEncrypted = await bcrytp.hash(req.body.password, salts);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordEncrypted,
  });

  const existeEmail = await User.findOne({ email: user.email });

  if (existeEmail) {
    return res.status(404).json({
      error: true,
      message: "Email ya registrado.",
    });
  }

  try {
    const saveUser = await user.save();
    res.json({
      error: null,
      message: "Usuario registrado exitosamente.",
      data: saveUser,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = schemaLogin.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      error: true,
      message: "Email no registrado.",
    });
  }

  const validPassword = await bcrytp.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      error: true,
      message: "Contraseña incorrecta.",
    });
  }
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).json({ error: null, data: token });
});

module.exports = router;
