var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment  	=require("./models/comment");
//var faker 		= require("faker");	


var data = [
	{
	 name: "Cloud's Rest", 
     image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
     description: "Spicy jalapeno bacon ipsum dolor amet filet mignon capicola short loin rump beef ribs cupim biltong picanha turkey porchetta andouille boudin prosciutto pork chop. Pork belly ball tip alcatra ground round, frankfurter shank bacon drumstick andouille. Sirloin alcatra tail drumstick pork chop cupim, venison shoulder ham cow meatloaf ground round. Ground round beef cupim strip steak pork shankle rump pork loin porchetta andouille biltong turducken chicken. Strip steak biltong pork belly meatball fatback."
 	},
	{
	name: "Desert Mesa", 
    image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
    description: "Spicy jalapeno bacon ipsum dolor amet filet mignon capicola short loin rump beef ribs cupim biltong picanha turkey porchetta andouille boudin prosciutto pork chop. Pork belly ball tip alcatra ground round, frankfurter shank bacon drumstick andouille. Sirloin alcatra tail drumstick pork chop cupim, venison shoulder ham cow meatloaf ground round. Ground round beef cupim strip steak pork shankle rump pork loin porchetta andouille biltong turducken chicken. Strip steak biltong pork belly meatball fatback."
	},
	{
	name: "Canyon Floor", 
    image:"https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Spicy jalapeno bacon ipsum dolor amet filet mignon capicola short loin rump beef ribs cupim biltong picanha turkey porchetta andouille boudin prosciutto pork chop. Pork belly ball tip alcatra ground round, frankfurter shank bacon drumstick andouille. Sirloin alcatra tail drumstick pork chop cupim, venison shoulder ham cow meatloaf ground round. Ground round beef cupim strip steak pork shankle rump pork loin porchetta andouille biltong turducken chicken. Strip steak biltong pork belly meatball fatback."
	}

]

function seedDB(){
//Remove Campgrounds

	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		}else{
			console.log("removed campgrounds!");
			}
	});

	//Add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if (err) {
				console.log(err);
			}else{
				console.log("Campground Added!");
				Comment.create(
				{
					text: "Comment Section",
					author: "Hobbo"
				
					
				}, function(err, comment){
					if (err) {
						console.log(err);
					}else{
							campground.comments.push(comment);
							campground.save();
							console.log("Created a new comment!");
					}
				});
			}
		});	
	});
	
	//Add a few comments

}

module.exports = seedDB;
