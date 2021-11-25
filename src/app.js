const express =require("express");
const path =require("path");
const app = express();
const methodOverride = require('method-override');
const mainRouter=require("./routes/main");
const usersRouter = require("./routes/users");
const productRouter= require("./routes/products");
const session = require('express-session');

app.use(session( {
    secret: "guaridaSecret",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.listen(3000, () => console.log("Server corriendo en el puerto 3000"));


