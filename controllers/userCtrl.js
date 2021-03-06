const Users = require('../models/userModal')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: 'Email này đã được đăng ký' })

            if (password.length < 6) return res.status(400).json({ msg: 'Mật khẩu phải từ 6 kí tự trở lên !' })

            // Password Encrypt
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({ name, email, password: passwordHash })
            await newUser.save()

            // JWT
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 //7d
            })

            res.json({ msg: 'Register Success !', accesstoken })


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: 'User does not exist!' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: 'Password is not correct!' })

            // JWT
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 //7d
            })

            res.json({ msg: 'Login Success !', accesstoken })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: 'Logged Out' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    refreshToken: async (req, res) => {
        try {

            const rf_token = req.cookies.refreshtoken
            if (!rf_token) {
                return res.status(400).json({ msg: 'Please Login or Register !' })
            }
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: 'Please Login or Register !' })

                const accesstoken = createAccessToken({ id: user.id })

                res.json({ accesstoken })
            })
            res.json({ rf_token })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: 'User does not exist!' })
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: 'User is not exist' })
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: 'Added to cart' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    history: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })
            res.json(history)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userCtrl