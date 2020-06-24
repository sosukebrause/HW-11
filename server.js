const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/api-routes.js");
const htmlRoutes = require("./routes/html-routes.js");

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`listening at: http://localhost:${PORT}`);
});
