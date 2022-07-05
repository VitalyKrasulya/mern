const {Router} = require("express")
const Link = require("../models/Link")
const router = Router()

//  /t
router.get("/:code",
	[],
	async (req, res) => {
		try {
			const link = await Link.findOne({code: req.params.code})
			if (!link) {
				return res.status(404).json({message: "Link by code not found"})
			}
			
			link.clicks++
			await link.save()
			
			res.redirect(link.from)
		} catch (e) {
			console.log("!!! Redirect routes error", e.message)
			res.status(500).json({message: "Oops, something went wrong. Try again."})
		}
	})


module.exports = router