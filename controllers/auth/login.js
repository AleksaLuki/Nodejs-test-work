// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const { User } = require('../../models/user');
// const { HttpError } = require('../../helpers');

// const { SECRET_KEY } = process.env;

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw HttpError(401, "Email or password is wrong");
//   }

//   const passwordCompare = await bcrypt.compare(password, user.password);

//   if (!passwordCompare) {
//     throw HttpError(401, "Email or password is wrong");
//   }
//   const id = user._id;
//   const payload = {
//     id,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

//   await User.findByIdAndUpdate(id, { token });

//   res.json({
//     token,
//     user: { email: user.email, password: user.password },
//   });
// };

// module.exports = login;
















// const jwt = require('jsonwebtoken');
// require("dotenv").config();
// const { SECRET_KEY } = process.env;

// const payload = {
//     id: "64b534e80224c48c5a21b4e4"
//   }
//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
// //  console.log(token);
// const decodeToken = jwt.decode(token);
// // console.log(decodeToken);
// try {
//     const {id} = jwt.verify(token, SECRET_KEY);
//     console.log(id);
//     const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjUzNGU4MDIyNGM0OGM1YTIxYjRlNCIsImlhdCI6MTY4OTk0ODU5MiwiZXhwIjoxNjkwMDM0OTkyfQ.rxMpEGK2UacTaXdamP6ojqrAd-xODVe8EbKigkmuAOw "
//     const result = jwt.verify(invalidToken, SECRET_KEY)
// }
// catch(error) {
//     console.log(error.message);
// }



const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
          throw HttpError(401, "Email or password is wrong");
        }

        const payload = {
              id: user._id,
            };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

        res.json({
          token,
        })
  }

  module.exports = login;