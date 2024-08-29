const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/notes"));

app.listen(port, () => {
  // console.log(`iNote app listening on port ${port}`);
});