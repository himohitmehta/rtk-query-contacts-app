const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const contactSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			// required: true,
		},
		description: String,
		backgroundColor: String,
	},
	{ timestamps: true, _id: true },
);

module.exports =
	mongoose.models.Contact || mongoose.model("Contact", contactSchema);
