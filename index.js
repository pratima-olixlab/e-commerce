const express = require("express");
const app = express();

var cors = require("cors");
const corsOpt = {
    origin: "",
    methods: [
        'POST'
    ],

    allowedHeaders: [
        "Access-Control-Allow-Origin",
        "Origin"
    ]
};

app.use(cors(corsOpt));

app.use(express.json());

app.use("/api",require("./app.routes"));
app.listen(4000, function (){
    console.log("Server-started");
})