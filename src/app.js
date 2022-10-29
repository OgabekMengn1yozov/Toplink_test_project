const Express = require("express");
const CookieParser = require("cookie-parser");
const Path = require("path");
const Fs = require("fs");
const Morgan = require("morgan");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("tiny"));

const RoutesPath = Path.join(__dirname, "routes");
Fs.readdir(routePath, (err, files) => {
  if (!err) throw new Error(err);

  files.forEach((file) => {
    const RoutePath = Path.join(__dirname, "routes", file);
    const Route = require(RoutePath);
    if (Route.path && Route.router) app.use(Route.path, Route.router);
  });

  app.get("*", (req, res) => {
    res.status(400).json({
      ok: false,
      message: "page not found",
    });
  });
});

module.exports = app;
