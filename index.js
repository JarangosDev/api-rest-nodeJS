const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();


//Inicialización del servidor
const app = express();

//Configuración del body-parser, para leer los datos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Conexión a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fccbtdj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((err) => {
    console.log(err);
  });

//Import de rutas
const authRoutes = require('./routes/auth')

//Configuración de los middlewares
app.use('/api/user', authRoutes)

app.use("/", (req, res) => {
  res.status(200).json({
    estado: "true",
    message: "Respuesta exitosa.",
  });
});



//Inicialización del servidor
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor a su servicio en el puerto ", port);
});
