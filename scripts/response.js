function generateAIResponse(userMessage) {
    if (userMessage.toLowerCase().includes('hello') || 
        userMessage.toLowerCase().includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (userMessage.toLowerCase().includes('how are you')) {
      return "I'm just a program, but I'm functioning well! How can I help you?";
    } else if (userMessage.toLowerCase().includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know?";
    } else if (userMessage.toLowerCase().includes('bye') || 
             userMessage.toLowerCase().includes('goodbye')) {
      return "Goodbye! Feel free to return if you have more questions.";
    } else if (userMessage.toLowerCase().includes('help')) {
      return "I'm here to help! You can ask me questions, and I'll do my best to assist you.";
    } else if (userMessage.endsWith('?')) {
      return "That's an interesting question. Let me think about it... Based on my understanding, I would say it depends on the specific context and factors involved.";
    } else {
      return `I received your message: "${userMessage}". How can I further assist you?`;
    }
  }
  module.exports = generateAIResponse;