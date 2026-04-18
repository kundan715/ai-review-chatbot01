const express = require("express");
const cors = require("cors");

const askRoute = require("./routes/askRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ask", askRoute);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});