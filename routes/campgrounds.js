var express = require("express");
var router 	= express.Router(); 
var Campground = require("../models/campground");


////INDEX ROUTE -- SHOW ALL CAMPGROUNDS
router.get("/campgrounds", function(req, res){   
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if (err) {
        console.log(err)
      }else{
          res.render("campgrounds/index",{campgrounds: allCampgrounds});     
      }
    });
});

// CREATE ROUTE -- ADD NEW CAMPGROUND TO DB


router.post("/campgrounds", isLoggedIn, function(req, res){
   // get data from FORM
   var name   = req.body.name;
   var price  = req.body.price;
   var image  = req.body.image;
   var desc   = req.body.description;
   var author =   {
      id: req.user._id,
      username: req.user.username
   }
   //add to Campgrounds array
  var newCampground = {name: name, price: price, image: image, description: desc, author: author};
  //Create a new Campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    }else{ //redirect back to campgrounds page
      console.log(newlyCreated); 
      res.redirect("/campgrounds");   
    }
  });
   
   
});

// SHOW FORM TO CREATE NEW CAMPGROUND


router.get("/campgrounds/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


// SHOW MORE INFO ABOUT ONE CAMPGROUND

router.get("/campgrounds/:id", function(req, res){
  // find the campground with the provided ID 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
      if (err) 
      {
        console.log(err);
      } else{
          res.render("campgrounds/show",{campground:foundCampground});
        }
    });
  //render to show that template with the campground
    
});
router.get("/campgrounds", function(req, res){   
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if (err) {
        console.log(err);
      }else{
          res.render("campgrounds/index",{campgrounds: allCampgrounds});     
      }
    });
   
});

// CREATE ROUTE -- ADD NEW CAMPGROUND TO DB


router.post("/campgrounds", function(req, res){
   // get data from FORM
   var name   = req.body.name;
   var image  = req.body.image;
   var desc   = req.body.description;
   //add to Campgrounds array
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    }else{ //redirect back to campgrounds page
      res.redirect("/campgrounds");   
    }
  });
   
   
});

// SHOW FORM TO CREATE NEW CAMPGROUND


router.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});


// SHOW MORE INFO ABOUT ONE CAMPGROUND

router.get("/campgrounds/:id", function(req, res){
  // find the campground with the provided ID 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
      if (err) 
      {
        console.log(err);
      } else{
          res.render("campgrounds/show",{campground:foundCampground});
        }
    });
  //render to show that template with the campground
    
});

//EDIT Campground Route

router.get("/campgrounds/:id/edit", checkOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
          res.render("campgrounds/edit",{campground: foundCampground});      
   });
});



//UPDATE Campground Route
router.put("/campgrounds/:id", checkOwnership, function(req, res){
  //find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
    if (err) {
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


//DESTROY campground route

router.delete("/campgrounds/:id", checkOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }

  });
});

//Middleware
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();

  }
   req.flash("error", "You must be Logged In To Do That!");
  res.redirect("/login");
}


function checkOwnership(req, res, next){
    if (req.isAuthenticated()) {
    

      Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
          req.flash("error", "Campground NOT Found!");
          res.redirect("back");
        }
          else
            //does user own the campground?
          {
            if (foundCampground.author.id.equals(req.user._id)) {
              next(); 
            }
            else{
              req.flash("error", "You Do not have permission to do that!");
              res.redirect("back");
            }
            
          }
        });

  }
  else
  {
    req.flash("error", "You need to be Logged In!");
    res.redirect("back");
  }
}

module.exports = router;