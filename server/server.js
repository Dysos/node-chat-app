const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, "../public");


const app = express();
const port = process.env.PORT || 3002;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});