const Message = require('../models/message.model');

module.exports.createMessage = async (req, res) => {
  const { user,message } = req.body;

  if (!user || !message) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Missing required fields',
  });
  }

  const newMessage = new Message({ ...req.body })

  newMessage.save(function (err, doc) {
    if (err) {
        return res.status(500).json({
            isSuccess: false,
            message: 'Database error',
        })
    } else {
        return res.status(200).json({
            isSuccess: true,
            message: 'Message is created',
            data: { message: doc},
        })
    }
});
}

module.exports.getMessages = async (req, res) => {
    const messages = await Message.find()
    res.json({ isSuccess: true, data: {messages} })
}