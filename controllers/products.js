const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ products });
}

exports.getAllProducts = async (req, res, next) => {
    const { featured, company, name, sort, fields } = req.query;
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

    let result = Product.find(queryObject);

    // Sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList);
    } else {
        result.sort('-createdAt');
    }

    // Select
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result.select(fieldsList);
    }


    // Limit and Pages  
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result.limit(limit).skip(skip);

    const products = await result;
    res.status(200).json({ products });
}