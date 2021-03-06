const express               = require('express');
const bodyParser            = require('body-parser');
const cookieSession         = require('cookie-session');
const authRouter            = require('./routes/admin/auth');
const adminProductRouter    = require('./routes/admin/products');
const productsRouter        = require('./routes/products/products');
const cartRouter            = require('./routes/cart/carts');
const app                   = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['a1b2c3d4']
}));


app.use(authRouter);
app.use(adminProductRouter);
app.use(productsRouter);
app.use(cartRouter);

app.listen(3000, () => {
  console.log('Listening');
});
