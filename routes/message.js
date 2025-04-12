const auth = require("../middleware/auth");
const Message = require("../models/message");
const generateAIResponse = require("../scripts/response");
const express = require('express');
const router = express.Router();

// Add this to your message route
router.get('/messages', auth, async (req, res) => {
    // Set a timeout for the response
    const timeout = setTimeout(() => {
      res.status(503).json({ error: 'Request timeout, please try again' });
    }, 30000); // 30 seconds timeout
    
    try {
      const messages = await Message.find({ user: req.user.id }).sort({ timestamp: 1 });
      clearTimeout(timeout); // Clear the timeout
      res.json(messages);
    } catch (error) {
      clearTimeout(timeout); // Clear the timeout
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.post('/message', auth, async (req, res) => {
    try {
      const userMessage = req.body.message;
      
      await Message.create({
        content: userMessage,
        sender: 'user',
        user: req.user.id
      });
      const aiResponse = await generateAIResponse(userMessage);
      
      await Message.create({
        content: aiResponse,
        sender: 'ai',
        user: req.user.id
      });
      
      res.json({ message: aiResponse });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.delete('/messages', auth, async (req, res) => {
    try {
      await Message.deleteMany({ user: req.user.id });
      res.json({ message: 'Chat history cleared' });
    } catch (error) {
      console.error('Error clearing messages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
