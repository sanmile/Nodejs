const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
    res.render('add-product',{ pageTitle: 'Add product', path: '/add-product' });
};

exports.postProduct = (req, res, next) => {
    const product = new Product();
    product.title = req.body.title;
    product.save();
    res.redirect('/');
};

exports.getProducts =(req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }