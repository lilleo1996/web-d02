const User = require('../models/user.model')

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })

    if (user) {
        res.json({ isSuccess: true, user })
    } else {
        res.json({ isSuccess: false, message: 'Email or password incorrect' })
    }
}