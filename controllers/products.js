const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res, next) => {
    const search = 'Cha';
    const products = await Product.find({
        name: { $regex: search, $options: 'i' }
    });
    res.status(200).json({ products });
}

exports.getAllProducts = async (req, res, next) => {
    const { featured, company, name, sort } = req.query;
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

    console.log(queryObject);
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        console.log(sortList);
        result.sort(sortList);
    } else {
        result.sort('-createdAt');
    }
    const products = await result;
    res.status(200).json({ products });
}