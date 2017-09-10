var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(process.env.PORT || 8000);
