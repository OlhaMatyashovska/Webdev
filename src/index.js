import express from "express";
import apiRouter from "./api";
import fs from "fs";
import https from "https";



const server = new express();
server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use("/api",apiRouter);
server.use((req, res, next) => { //переадресування всіх запитів з http з https
    if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`);
    else
        next();
});
const httpsOptions = {
    key: fs.readFileSync('./secret/key.pem'),
    cert: fs.readFileSync('./secret/cert.pem')
};
const httpsServer = https.createServer(httpsOptions, server);
httpsServer.listen(2043);
console.log("https://localhost:2043");
server.listen(2000);
console.log("http://localhost:2000");
