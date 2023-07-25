const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');


const updateFavorite = async (req, res) => {
    if (req.body.favorite === undefined) {
      throw HttpError(400, "missing field favorite");
    }
    const { id }  = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
};

  module.exports = updateFavorite;