const express = require("express");
const app = express();
const PORT = 3000;
const HOST = "127.0.0.1";

app.get("/", (req, res) => {
    res.send("Server is active");
});

app.use((req, res) => {
    return res.status(404).send("page not available on server");
});

app.listen(PORT, HOST, () => {
    console.log(` server started @: http://${HOST}:${PORT}`);
});
