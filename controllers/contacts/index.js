const { ctrlWrapper } = require('../../helpers');
const getAll = require('./getAll');
const getContact = require('./getContact');
const addNewContact = require('./addNewContact');
const updateStatusContact = require('./updateStatusContact');
const deleteContact = require('./deleteContact');
const updateFavorite = require('./updateFavorite');


module.exports = {
    getAll: ctrlWrapper(getAll),
    getContact: ctrlWrapper(getContact),
    addNewContact: ctrlWrapper(addNewContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateFavorite: ctrlWrapper(updateFavorite),
}