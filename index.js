const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  const date_string = req.params.date;
  let rawDate;

  if (!date_string) {
    rawDate = new Date();
  } else {
    if (!isNaN(date_string)) {
      rawDate = new Date(parseInt(date_string));
    } else {
      rawDate = new Date(date_string);
    }
  }

  if (rawDate.toString() === "Invalid Date") {
    res.json({ error: rawDate.toString() });
  } else {
    res.json({ unix: rawDate.getTime(), utc: rawDate.toUTCString() });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
