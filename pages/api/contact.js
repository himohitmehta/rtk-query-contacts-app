import dbConnect from "@/utils/mongoDBConnect";
import {
	getContacts,
	getContact,
	createContact,
	deleteContact,
	updateContact,
} from "@/backend/controllers/contactController";

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "GET":
			await getContacts(req, res);
			break;
		case "POST":
			await createContact(req, res);
			break;
		case "DELETE":
			await deleteContact(req, res);
			break;
		case "PUT":
			await updateContact(req, res);
		default:
			res.status(400).json({ success: false });
			break;
	}
}
