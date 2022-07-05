const {Router} = require("express")
const config = require("config")
const Link = require("../models/Link")
const router = Router()
const auth = require("./../middleware/auth.middleware")
const shortid = require("shortid")

//  /api/link
router.post("/generate",
	auth,
	async (req, res) => {
		try {
			const {from} = req.body
			
			const existLink = await Link.findOne({from})
			if (existLink) {
				return res.json({link:existLink})
			}
			
			const code = shortid.generate()
			const baseUrl = config.get("baseUrl")
			const to = baseUrl + "t/" + code
			const link = new Link({
				code, from, to, owner: req.user.userId
			})
			
			await link.save()
			
			res.status(201).json({link})
		}catch (e) {
			console.log("!!! Link routes generate error", e.message)
			res.status(500).json({message:"Oops, something went wrong. Try again."})
		}
})


router.get("/",
	auth,
	async (req, res) => {
		try {
			const links = await Link.find({owner: req.user.userId})
			res.json(links)
		}catch (e) {
			console.log("!!! Link routes / error", e.message)
			res.status(500).json({message:"Oops, something went wrong. Try again."})
		}
})


router.get("/:id",
	auth,
	async (req, res) => {
		try {
			const link = await Link.findById(req.params.id)
			res.json(link)
		}catch (e) {
			console.log("!!! Link routes :id error", e.message)
			res.status(500).json({message:"Oops, something went wrong. Try again."})
		}
})

module.exports = router