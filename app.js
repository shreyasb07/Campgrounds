var express 	    = require("express");
var app 		      = express();
var bodyParser 	  = require("body-parser");
var Campground    = require("./models/campground");
var mongoose      = require("mongoose");
var seedDB        = require("./seeds");
var methodOverride  = require("method-override");
//var faker         = require("faker");
var Comment       = require("./models/comment");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var User          = require("./models/user");
var flash         = require("connect-flash");

var commentsRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  authRoutes       = require("./routes/auth");



const databaseUri = "mongodb://shreyasb:QwertyIndia@ds243335.mlab.com:43335/myappdb";
mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected!`))
      .catch(err => console.log(`Database connection error: ${err.message}`)); 
//mongoose.connect("mongodb://localhost/yelp_camp");
//**mongoose.connect("mongodb://shreyasb_07:Qwerty@123456@ds243335.mlab.com:43335/myappdb");
// mongodb://shreyasb_07:Qwerty@123456@ds243335.mlab.com:43335/myappdb
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//Seed the Database
//seedDB();

//PASSPORT Config

app.use(require("express-session")({
    secret: "This is a secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
});


// Campground.create(
//   {
//       name: "Salmon Creek", 
//       image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg",
//       description: "This is the description paragraph!"
//   }, function(err, campground){
//       if (err) {
//         console.log(err);
//       } else{
//         console.log("Newly Created Campground");
//         console.log(campground);
//       }
//     });






/*var campgrounds = [
    {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"},
    {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"},
    {name: "Death Valley", image: "https://farm5.staticflickr.com/4376/36437924985_07bb927043.jpg"}
];
*/

app.use(authRoutes);
app.use(commentsRoutes);
app.use(campgroundRoutes);








app.listen(process.env.PORT || 1337, function(){
    console.log("Server Connected!");
});