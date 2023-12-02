if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOveride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const LocalStrategy = require("passport-local");
const User = require("./model/auth/user");
const multer = require("multer");
const bodyParser = require("body-parser");
const ExpressError = require("./views/utilities/ExpressError");
const catchAsync = require("./views/utilities/catchAsync");
const axios = require("axios");
const { Parser } = require("m3u8-parser");
const QuizCard = require("./model/home/quizapp/quizcard");
const Videos = require("./model/home/upload/videoupload");
const cors = require("cors");
const OpenAI = require("openai");
const MongoStore = require("connect-mongo");

//ROutes
const modelRoutes = require("./routes/content/main");

const upload = multer({ storage: multer.memoryStorage() });
const dbUrl = process.env.MONGODB_URL;
//session - database
const sessionConfig = {
  secret: "thisshouldbebetter",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 100 * 60 * 60 * 24 * 7,
    maxAge: 100 * 60 * 60 * 24 * 7,
  },
  store: MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 1024 * 3600, // time period in seconds
  }),
};
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log("open");
  })
  .catch((err) => {
    console.log("Oh no");
    console.log(err);
  });

//apps config
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);
app.use(methodOveride("_method"));
app.use(express.static("layout"));
app.use(express.static("js"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  //  const users = await User.findById('64bc4922b2aafaad4ddbbb50')
  //   req.user=users
  //   if(req.user){
  //  const currentuser = await User.findById(req.user._id).populate('quizCard')
  // //  console.log(currentuser)
  // req.user = currentuser
  //   }
  res.locals.currentUser = req.user;

  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  res.locals.error = req.flash("error");

  next();
});

// app.use ('/', authRoutes)
app.use("/", modelRoutes);

//sitemap

app.get("/atom.xml", async (req, res) => {
  try {
    const baseUrl = "http://gukari.com"; // Update with your website's base URL
    const currentDate = new Date().toISOString();

    // Generate the sitemap XML dynamically
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add URLs dynamically from your website
    sitemap += `<url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>\n`;

    // Add URLs from other sources, like database entries
    const quizcards = await QuizCard.find({});
    quizcards.forEach((quizcard) => {
      sitemap += `<url>
          <loc>${baseUrl}/home/quiz/${quizcard._id}</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.9</priority>
        </url>\n`;
    });
    const users = await User.find({});
    users.forEach((user) => {
      sitemap += `<url>
          <loc>${baseUrl}/home/profile/${user._id}</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>\n`;
    });
    const videos = await Videos.find({});
    videos.forEach((video) => {
      sitemap += `<url>
          <loc>${baseUrl}/home/video/${video._id}</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.9</priority>
        </url>\n`;
    });
    sitemap += `<url>
      <loc>http://gukari.com/discover</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.9</priority>
    </url>\n
  
    
    `;
    sitemap += "</urlset>";

    // Save the generated sitemap XML to a file
    const filePath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(filePath, sitemap, "utf8");

    // Set the content type header and send the file as the response
    res.header("Content-Type", "application/xml");
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 404 page not found route
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
// error hadling
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("handles/error.ejs", { err });
});

//server
app.listen(4000, function () {
  console.log("Server running...");
});
