const { Contact } = require('../../models/contact');

const addNewContact = async (req, res, next) => {
    // const { _id: owner } = req.user;
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  };

  module.exports = addNewContact;