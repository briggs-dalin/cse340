const utilities = require("../utilities/index")
const baseContoller = {}

baseContoller.buildHome = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("index", {title: "Home", nav})
}

module.exports = baseContoller