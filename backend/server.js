const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use("/", router);

// app.get("/", (req, res) => {
// 	res.status(200).send("Server is working");
// });

app.listen(port, () => {
	console.log("Server is runing on port " + port);
});

app.use("/", express.static("../frontend"));
