//Initialization
var express = require("express"),
	exp = express();
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override");

//Mongoose DB Config
mongoose.connect('mongodb://localhost/restfulblog', { useMongoClient: true });

//App Config
exp.set('view engine', 'ejs');
exp.use(express.static("public"));
exp.use(bodyParser.urlencoded({extended: true}));
exp.use(methodOverride("_method"));


//Mongoose Model Declaration
var blogPostSchema = new mongoose.Schema({
	title: String,
	img: String,
	author: String,
	body: String,
	date: { type: Date, default: Date.now }
});

var Blog = mongoose.model('blogpost', blogPostSchema);

//RESTful Routes
exp.get('/', function(req, res){
	res.redirect('/blog');
});

//Index Route
exp.get('/blog', function(req, res){
	Blog.find({}, function(err, blogPosts){
		if(err) {
			console.log("ERR LOADING BLOGS");
			res.redirect('/');
		} else {
			res.render('blog', { blogPosts: blogPosts });
		}
	});
});

//New Route
exp.get('/blog/new', function(req, res) {
	res.render('new');
})

//Create Route
exp.post('/blog', function(req, res){
	Blog.create(req.body, function(err, savedPost){
		if(err)
			console.log("ERR CREATING BLOG");
		else {
			res.redirect("/blog");
		}
	});
});

//Show Route
exp.get('/blog/:id', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err)
			console.log('ERR LOADING BLOG BY ID');
		else{
			res.render("show", { post: foundBlog })
		}
	});
});

//Edit Route
exp.get('/blog/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		res.render('edit', { post: foundBlog } );
	});
});

//Update Route
exp.put('/blog/:id', function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedPost){
		if(err)
			console.log("ERR UPDATING POST")
		else
			res.redirect("/blog/"+updatedPost._id);
	});
});

//Delete Route
exp.delete('/blog/:id', function(req, res){
	//destroy blog in database
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err)
			console.log("ERR REMOVING POST");
		else
			res.redirect('/blog');

	});
});


exp.listen(3000, function(){
	console.log("SERVER INICIATED");
});
