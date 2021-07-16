const express               = require('express');
const productsRepo          = require('../../repositories/products');
const newProductTemplate    = require('../../views/admin/products/newProduct');
const { validationResult }  =   require('express-validator');
const { requireTitle, requirePrice }                  = require('./validators');

const router = express.Router();

router.get('/admin/products', async (req, res) => {

});

router.get('/admin/products/new', async (req, res) => {
    res.send(newProductTemplate({}));
});

router.post('/admin/products/new', [
    requireTitle,
    requirePrice
    ],
    async (req, res) => {
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
       return res.send(newProductTemplate({ errors }));
    }

    res.send('submitted');
});


module.exports = router;
