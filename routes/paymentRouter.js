const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const authAdmin = require('../middlewares/authAdmin')
const auth = require('../middlewares/auth')

router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router