const Payments = require('../models/paymentModel')
const Users = require('../models/userModal')
const Products = require('../models/productModal')

const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if (!user) return res.status(400).json({ msg: 'User does not exits' })

            const { cart, paymentID, address } = req.body
            const { _id, name, email } = user

            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address
            })

            // Tính số sản phẩm đã bán 
            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })
            // cart.forEach(item => {
            //     return sold(item._id, item.quantity, item.sold)
            // })

            await newPayment.save()
            res.json({ msg: 'Payment Success' })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl