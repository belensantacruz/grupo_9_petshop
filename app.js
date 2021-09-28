const express =require("express");
const path =require ("path");

const app = express(); 
app.use(express.static(path.resolve(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/index.html"));
});

// Header
app.get("/header", (req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/header.html"));
});

// Footer
app.get("/footer", (req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/footer.html"));
});

// Login
app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/login.html"));
});
// Registro
app.get("/registro", (req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/registro.html"));
});


app.listen(3000, () => console.log("Server corriendo en el puerto 3000"));
