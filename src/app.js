const config = require("./config/config");
const dbConnect = require("./config/database");

const express = require("express");
const app = express();

const environment = config.environment.development;
const { port: PORT, host: HOST } = environment;

const { authRouter } = require("./routes/auth");

app.use(express.json());
app.use("/auth", authRouter);

app.use((req, res) => {
    return res.status(404).send("page not available on server");
});
dbConnect()
    .then(() => {
        console.log("database connected successfully");
        app.listen(PORT, HOST, () => {
            console.log(` server started @: http://${HOST}:${PORT}`);
        });
    })
    .catch(() => {
        console.error("DB Connection cannot be established");
    });
