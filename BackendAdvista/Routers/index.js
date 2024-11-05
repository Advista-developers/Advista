const express = require("express")

const router = express.Router()
const authRoute = require("./auth")
// const chatroute=require("./chat")

router.use("/auth",authRoute)
// router.use("/chat",chatroute)

module.exports = router