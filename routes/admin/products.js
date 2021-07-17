const express                       = require('express');
const multer                        = require('multer');
const productsRepo                  = require('../../repositories/products');
const productsIndexTemplate         = require('../../views/admin/products/index');
const newProductTemplate            = require('../../views/admin/products/newProduct');
const productEditTemplate            = require('../../views/admin/products/editProduct');
const { handleErrors, guard }       = require('./middlewares');
const { requireTitle,
        requirePrice }              = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', guard, async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));

});

router.get('/admin/products/new', guard, async (req, res) => {
    res.send(newProductTemplate({}));
});

router.post('/admin/products/new',
    guard,
    upload.single('image'), [
    requireTitle,
    requirePrice
    ],
    handleErrors(newProductTemplate),
    async (req, res) => {

    const { title, price } = req.body;
    const image = req.file.buffer.toString('base64');

    await productsRepo.create( {title, price, image });

    res.redirect('/admin/products');
});

router.get('/admin/products/:id/edit', guard, async (req, res) => {
    const product = await productsRepo.getOne(req.params.id);

    if (!product) return res.send('Product not found');

    res.send(productEditTemplate({ product }));
});


router.post('/admin/products/:id/edit',
    guard,
    upload.single('image'),
    [requireTitle, requirePrice],
    handleErrors(productEditTemplate),
    async (req, res) => {



});




module.exports = router;
