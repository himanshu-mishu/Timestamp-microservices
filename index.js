var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// ✅ Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;
  if (!dateString) {
    date = new Date();
  } else if (/^\d+$/.test(dateString)) {
    // Unix timestamp in milliseconds
    date = new Date(Number(dateString));
  } else {
    // Try parsing as a standard date string
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listener
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
