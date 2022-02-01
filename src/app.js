const express =require("express");
const path =require("path");
const app = express();
const methodOverride = require('method-override');
const mainRouter=require("./routes/main");
const usersRouter = require("./routes/users");
const productRouter= require("./routes/products");
const apiRouter = require("./routes/api");
const session = require('express-session');
const loggedMiddleware = require('./middlewares/loggedMiddleware')
const cookies = require('cookie-parser');

app.use(session( {
    secret: "guaridaSecret",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(loggedMiddleware);
app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/api", apiRouter);
app.listen(8080, () => console.log("Server corriendo en el puerto 8080"));