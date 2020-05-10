var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Connect to Mongodb
mongoose.connect(
	"mongodb://localhost/user-login",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		console.log("connected", err ? err : true);
	}
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// app.use((req, res, next) => {
// console.log(req.cookies);
// res.cookie("count", 1);
// next();
// if (req.cookies.count) {
// 	var num = Number(req.cookies.count);
// 	res.cookie("count", num + 1);
// } else {
// 	res.cookie("count", 1);
// }
// next();
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
