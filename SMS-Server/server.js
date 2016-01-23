//call the packages we need
var express         = require("express");
var bodyParser      = require("body-parser");
var app             = express();
var mongoose        = require('mongoose');
var User            = require('./models/user');
var morgan          = require('morgan');

var jwt             = require('jsonwebtoken');
var config          = require('./config');
var cors            = require('cors');

var router = express.Router();  // let get an instance of the express Router
var port = process.env.PORT || 3000; //set the port
mongoose.connect(config.database);
app.set('superSecret', config.secret);
//configure app to use bodyParser()
//this will let is get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));// for logging requests to the console
app.use(cors());


//route to authenticate a user (POST http://localhost:3000/api/authenticate)
router.post('/authenticate',function(req, res){
  //find the user
  User.findOne({
    userName: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      //res.send({success: false, msg: 'Authentication failed. User not found.'});
      res.json({success: false, msg: 'Authentication failed. User not found.'});
    }else if(user){
      //check if password match
      user.comparePassword(req.body.password, function(err, isMatch){
        if (isMatch && !err) {
          var token = jwt.sign(user, app.get('superSecret'),{
            expiresInMinutes: 1440 //expires in 24 hours
          });

          //return the information including tokesn as JSON
          res.json({
            success: true,
            msg: 'Enjoy your token',
            token: token

          });
        } else{
          res.json({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/setup', function(req, res){
  var nick = new User({ // new user
    firstName: 'Guelor',
    password: 'test1'
  }); // create new instance of User model

  nick.save(function(err){
    if (err) {
      //res.send(err);
      res.json({success: false, msg:'Username or email already exist '});
    } else {
      res.json({success: true, msg: 'Successful created user!'});
    }
  });
});

router.get('/', function(req, res) {
  res.json({msg: 'welcome to our api!'});
});

// on rotes that end in /Users
router.route('/signup').post(function(req, res){

  if (!req.body.firstName)
    res.json({success: false, msg:'Please fill in firtname field'});
  else if( !req.body.password)
      res.json({success: false, msg:'Please fill password field'});
  /*else if (!req.body.lastName)
      res.json({success: false, msg:'Please fill in lastname field'});
  else if (!req.body.name)
    res.json({success: false, msg:'Please fill in user name field.'});
  else if ( !req.body.email)
    res.json({success: false, msg:'Please fill in email field.'});*/

  else {
    var newUser = new User({ // new user
      firstName: req.body.firstName,
      password: req.body.password
    }); // create new instance of User model

    //let save the user and check for errors
    newUser.save(function(err){
      if (err) {
        //res.send(err);
        res.json({success: false, msg:'Username or email already exist '});
      } else {
        res.json({success: true, msg: 'Successful created user!'});
      }
    });

  }


});

//middleware to use for all requests
//let protect :use middleware to protecte /api/users
router.use(function(req, res, next){
  console.log("Let Party hard this weekend!");
  //let check the header for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  //decode token
  if (token) {
    //let verifies secret and check exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded){
      if(err){
        return res.json({success: false, msg:'Failed to authenticate token.'});
      }else {
        // Oh yes, you can have our cakes
        req.decoded = decoded;
        next(); // for going to the next routes and dont stop here
      }
    });
  }else {
    // There is no more tokens
    return res.status(403).send({
      success:false,
      msg: 'No token provided.'
    });
  }
});

router.get('/users', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  });
});
// on route that end in /users/:user_id
router.route('/users/:user_id').get(function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if (err)
      res.send(err);
    res.json(user);
  });
}).put(function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if (err)
      res.send(err)
    user.firstName = req.body.firstName; //updates
    user.password = re.body.password;

    user.save(function(err){
      if (err)
        res.send(err);
      res.json({msg: "User updated!"});
    });
  });
}).delete(function(req, res){
  User.remove({
    _id: req.params.user_id
  }, function(err, bear){
    if (err)
      res.send(err);

    res.json({message:"Succesfully deleted"});
  });
});
//all of our routes will be prefixed with /api
app.use('/api', router);
app.listen(port);
console.log("listening on port " + port);
