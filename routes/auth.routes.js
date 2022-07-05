const {Router} = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const config = require("config")
const {check, validationResult} = require("express-validator")
const router = Router()

//  /api/auth
router.post(
	"/register",
	[
		check("email", "Incorrect email").isEmail(),
		check("password", "Minimum password length is 6").isLength({min: 6})
	],
	
	async (req, res) => {
		try {
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).json({errors: errors.array(), message: "Incorrect credentials"})
			}
			
			const {email, password} = req.body
			
			const findUser = await User.findOne({email})
			
			if (findUser) {
				return res.status(400).json({message: "User already exist"})
			}
			
			const hashedPass = await bcrypt.hash(password, 12)
			const user = new User({email, password: hashedPass})
			
			await user.save()
			
			res.status(201).json({message: "User created"})
			
		} catch (e) {
			console.log("!!! Auth routes register error", e.message)
			res.status(500).json({message: "Oops, something went wrong. Try again."})
		}
	})


router.post(
	"/login",
	[
		check("email", "Wrong email").normalizeEmail().isEmail(),
		check("password", "Enter password").exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			
			if (!errors.isEmpty()) {
				return res.status(400).json({errors: errors.array(), message: "Incorrect credentials"})
			}
			
			const {email, password} = req.body
			
			const user = await User.findOne({email})
			
			if (!user) {
				return res.status(400).json({message: "User not found"})
			}
			
			const isMatch = await bcrypt.compare(password, user.password)
			
			if (!isMatch) {
				return res.status(400).json({message: "Wrong password"})
			}
			
			const token = jwt.sign(
				{userId: user.id},
				config.get("jwtSecret"),
				{expiresIn: "1d"}
			)
			
			res.json({token, userId: user.id})
			
		} catch (e) {
			console.log("!!! Auth routes login error", e.message)
			res.status(500).json({message: "Oops, something went wrong. Try again."})
		}
	})

module.exports = router