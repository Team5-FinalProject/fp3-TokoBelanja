const { Product } = require('../models')

class ProductController {
    static async createProduct(req, res) {
        const { title, price, stock, CategoryId } = req.body
        Product.create({
            title,
            price,
            stock,
            CategoryId
        })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static async readProduct(req, res) {
        Product.findAll()
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static async updateProductById(req, res) {
        const id = +req.params.productId
        const { title, price, stock } = req.body
        Product.update({
            title,
            price,
            stock
        }, {
            where: {
                id
            }
        })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static async updateCategoryProduct(req, res) {
        const id = +req.params.productId
        const { CategoryId } = req.body
        Product.update({
            CategoryId
        }, {
            where: {
                id
            }
        })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static async deleteProductById(req, res) {
        const id = +req.params.productId
        Product.destroy({
            where: {
                id
            }
        })
            .then((product) => {
                res.status(200).json({ message: "Product has been successfuly deleted" })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController