// const bcrypt = require("bcrypt");
// const { User } = require("../../models/user");
// const { HttpError } = require("../../helpers");

// const register = async (req, res) => {
//   const body = req.body;

//   const { email, password } = body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "Email already in use");
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({ ...body, password: hashPassword });
//   res
//     .status(201)
//     .json({ email: newUser.email, subscription: newUser.subscription });
// };

// module.exports = register;




const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });
  
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
  };
  
      await sendEmail(verifyEmail);

    res.status(201)
       .json({ email: newUser.email, 
             name: newUser.name });
};

module.exports = register;