import Contact from "../models/contactModel";
import mongoose from "mongoose";

// get all Contacts
const getContacts = async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });

  res.status(200).json(contacts);
};

// get a single Contact
const getContact = async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Contact" });
  }

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({ error: "No such Contact" });
  }

  res.status(200).json(contact);
};

// create a new Contact
const createContact = async (req, res) => {
  const { fullName } = req.body;

  let emptyFields = [];

  if (!fullName) {
    emptyFields.push("fullName");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const contact = await Contact.create({
      ...req.body,
    });
    res.status(200).json({ result: contact, status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Contact
const deleteContact = async (req, res) => {
  const { id } = req.body;

  // console.log({ body: req.body, id: req.body.id });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Something is wrong",
    });
  }

  const contact = await Contact.findOneAndDelete({ _id: id });

  if (!contact) {
    return res.status(400).json({ error: "No such Contact" });
  }

  res.status(200).json(contact);
};

// update a Contact
const updateContact = async (req, res) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Contact" });
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!contact) {
    return res.status(400).json({ error: "No such Contact" });
  }

  res.status(200).json(contact);
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};