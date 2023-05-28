const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
// Constantes
const PORT = 8080;
const specs = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, "./controllers/routes/*.js")}`],
};

// Inicializaciones
const app = express();

// Configuraciones
app.set("port", process.env.PORT || PORT);

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(specs)));

// Rutas
app.use("/api/users/", require("./controllers/routes/users.routes.js"));

// Publico
app.use(express.static(path.join(__dirname, "public")));

// Iniciando servidor
app.listen(app.get("port"), () => {
  console.log(`Server running  in: http://localhost:${app.get("port")}`);
});
