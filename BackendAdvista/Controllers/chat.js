const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');  // Directly import the OpenAI class

// Create a new OpenAI instance with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is set in environment variables
});

const chatwithOpenAI = async (req, res) => {
    const { messages } = req.body; // Extract messages from request body

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',  // Specify the model
            messages: messages,      // The conversation messages
        });

        res.json({
            response: response.choices[0].message, // Send back the chatbot response
        });
    } catch (error) {
        console.error('Error with OpenAI API:', error.message || error);
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
};

module.exports = {
    chatwithOpenAI
};
