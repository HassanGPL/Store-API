const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res, next) => {
    const search = 'Cha';
    const products = await Product.find({
        name: { $regex: search, $options: 'i' }
    });
    res.status(200).json({ products });
}

exports.getAllProducts = async (req, res, next) => {
    const { featured, company, name } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    const products = await Product.find(queryObject);
    console.log(queryObject);
    res.status(200).json({ products });
}