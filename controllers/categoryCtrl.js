
const Category = require('../models/categoryModel')
const Products = require('../models/productModal')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            // Only admin can create, delete and update category !!!
            // if user have role = 1 ===> admin
            const { name } = req.body
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: 'This category is already exist' })
            const newCategory = new Category({ name })
            await newCategory.save()
            res.json({ msg: 'Created a category' })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id })
            if (products) return res.status(400).json({ msg: 'Hãy xóa tất cả sản phẩm có Category này trước khi xóa Category' })

            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: 'Delete Category' })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    updateCategory: async (req, res) => {
        try {

            const { name } = req.body
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })
            res.json({ msg: 'Updated Category' })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = categoryCtrl