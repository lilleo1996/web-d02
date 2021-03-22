const Message = require('../models/message.model');

module.exports.createMessage = async (req, res) => {
  const { user,message } = req.body;

  if (!user || !message) {
    return res.json({
      isSuccess: false,
      message: 'Missing required fields',
  });
  }

  const newMessage = new Message({ ...req.body })

  newMessage.save(function (err, doc) {
    console.log("🚀 ~ file: messages.controller.js ~ line 16 ~ doc", doc)
    if (err) {
        return res.json({
            isSuccess: false,
            message: 'Database error',
        })
    } else {
        return res.json({
            isSuccess: true,
            message: 'Message is created',
            data: doc,
        })
    }
});
}