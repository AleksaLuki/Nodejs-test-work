// const { Schema, model } = require('mongoose');
// const { handleMongoosError } = require('../helpers');
// const Joi = require('joi');


// const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
// const subList = ["starter", "pro", "business"];

// const userSchema = new Schema(
//   {
//     password: {
//       type: String,
//       required: [true, "Set password for user"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       match: emailRegexp,
//       uniqe: true,
//     },
//     subscription: {
//       type: String,
//       enum: subList,
//       default: "starter",
//     },
//     token: String,
//   },
//   { versionKey: false, timestamps: true }
// );

// userSchema.post("save", handleMongoosError);

// const registerSchema = Joi.object({
//   password: Joi.string().required(),
//   email: Joi.string().pattern(emailRegexp).required(),
//   subscription: Joi.string().valid(...subList),
// });

// const loginSchema = Joi.object({
//   password: Joi.string().required(),
//   email: Joi.string().pattern(emailRegexp).required(),
// });

// const updatedSub = Joi.object({
//   subscription: Joi.string()
//     .valid(...subList)
//     .required(),
// });

// const schemas = {
//   registerSchema,
//   loginSchema,
//   updatedSub,
// };

// const User = model("user", userSchema);

// module.exports = {
//   User,
//   schemas,
// };





const { Schema, model } = require('mongoose');
const { handleMongoosError } = require('../helpers');
const Joi = require('joi');


const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
   
    email: {
      type: String,
      required: true, 
      unique: true,
      match: emailRegexp,
    },

     password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongoosError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  
});


const schemas = {
  registerSchema,
  loginSchema,

};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};