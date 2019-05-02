require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
// const userRoute = require("./routes/api");
// const dogRoute = require("./routes/api/dogs");
// const postRoute = require("./routes/api/posts");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/dog", dogRoute);
// app.use("/api/post", postRoute);
// app.use("/api/comment", require("./routes/api/comments"));


const PORT = process.env.PORT || 5000;

sequelize
    .sync({
        force: false
    })
    .then(result => {
        app.listen(PORT, () => console.log("Started on PORT") + PORT)
    })
    .catch(err => console.log(err));