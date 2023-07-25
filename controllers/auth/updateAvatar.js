const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../public/avatars");
const avatarSize = 250;

const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(Jimp.AUTO, avatarSize).write(tempUpload);
    })
    .catch((err) => {
      throw err;
    });
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, {avatarURL});

  res.json({
    avatarURL,
  })
}

module.exports = updateAvatar;