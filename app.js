const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const nodemon = require("nodemon")
const path = require("path")


const expr = express()

expr.use(express.json({extended:true}))
expr.use("/api/auth", require("./routes/auth.routes"))
expr.use("/api/link", require("./routes/links.routes"))
expr.use("/t", require("./routes/redirect.routes"))

if (process.env.NODE_ENV === "production") {
	expr.use("/", express.static(path.join(__dirname, "client", "build")))
	
	expr.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client/build", "index.html"))
	})
}

const PORT = config.get("port") || 5000

async function start() {
	try {
		await mongoose.connect(config.get("mongoUri"), {
			useUnifiedTopology:true
		})
		expr.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
	}catch (e) {
		console.log("!!! App error", e.message)
		process.exit(1)
	}
}

start()