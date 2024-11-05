const express =require('express');
const { chatwithOPenAI } = require('../Controllers/chat');

const router=express.Router();

router.post('/chatbot',chatwithOPenAI)

module.exports=router