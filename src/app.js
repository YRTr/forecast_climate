const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//console.log(__dirname);
//console.log(__filename);
//>>console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 5500;

//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//  Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Forecast",
    name: "yrt ravi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "yrt ravi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Get the help here",
    statement: "Queries ??",
    name: "yrt ravi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide the location",
    });
  } else {
    geocode(req.query.address, (error, data) => {
      //data = { latitude, longitude, location } - can destructure

      if (error) {
        return res.send({
          error: "Check the location",
        });
      }
      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: "Something wrong. check please",
          });
        }
        res.send({
          location: data.location,
          address: req.query.address,
          forecast: forecastData,
        });
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Web Server started running at port " + port);
});
