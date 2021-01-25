var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const User = require('./models/md_users')
var session = require('express-session')


// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addRouter = require('./routes/add');
var curseRouter = require('./routes/curse');
var cartRouter = require('./routes/cart');
var cartOrders = require('./routes/orders');
var auth = require('./routes/auth');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

let variables = require('./middleware/variables')

/*
app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
*/

async function start(){
  const admin = await User.findOne({})
  if(!admin){
    User.create({
      email:'xxx@mail.ru',
      name:'vasa',
      cart:{
        items:[]
      }
    })
  }
}
start()

/*
app.use(async (req,res,next)=>{
  try {
    const user = await User.findById('6005a327b5a56d27ec0bb8d8')
    if(user){
      req.user = user
      next()
    }
  } catch (error) {
    console.log(error)
  }
})
*/

app.use('/', indexRouter);


app.use('/add',[variables],addRouter);
app.use('/curse',curseRouter);
app.use('/cart',cartRouter);
app.use('/orders',cartOrders);
app.use(auth);



/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
