require('dotenv').config();

module.exports = {
	"database" : process.env.DB_HOST || "mongodb://localhost/sello",
	"port" : process.env.PORT || 3000,
	"secretKey" : "YourSecretKey"
}
