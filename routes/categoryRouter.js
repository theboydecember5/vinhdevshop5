const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const authAdmin = require('../middlewares/authAdmin')
const auth = require('../middlewares/auth')

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)

module.exports = router