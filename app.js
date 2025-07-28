if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");

const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// ✅ Function to apply all app configuration
module.exports = function (app) {
  // ⛓️ Connect to MongoDB
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("✅ Connected to DB");
    })
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

  // 🔧 View engine setup
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.engine("ejs", ejsMate);

  // 🧩 Middleware setup
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.use(express.static(path.join(__dirname, "public")));

  // 🧠 Session setup
  const sessionOptions = {
    secret: process.env.SECRET || "notagoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  };

  app.use(session(sessionOptions));
  app.use(flash());

  // 🔐 Passport setup
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // 🌐 Locals for templates
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  });

  // 🛣️ Routes
  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewRouter);
  app.use("/", userRouter);

  // ❌ 404 Handler
  app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
  });

  // 💥 Global error handler
  app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
  });

  // ✅ Return app to be used by Vercel
  return app;
};
