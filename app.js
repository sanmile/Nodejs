const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('603e4d2ecaedee26d81403a6')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect( 'mongodb+srv://sandra:BEJNwCI3WQRqyra3@cluster0.ojcsn.mongodb.net/shop?retryWrites=true&w=majority', {useNewUrlParser: true},  { useUnifiedTopology: true })
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Sandra',
        email: 'sandra@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch( error => {
  console.log(error);
});