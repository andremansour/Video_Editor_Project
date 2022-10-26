const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

// middleware routes
app.use("/api/users", userRoute);

// routes 
app.get("/", (req, res) =>{
    res.send("Home Page")
})

//Error Handler
app.use(errorHandler);

// connect to DB and start server
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));

