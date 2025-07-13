const express = require("express");
const app = express();
const path = require("path");
const db = require("./models");
const postRoutes = require("./routes/post.routes");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
});

// 全てのルート登録と listener のあとに
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    message: err.message,
    error: err
  });});
