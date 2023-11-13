const Joi = require('joi');

const quizCardSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(500),
  tags: Joi.string(),
  color: Joi.array().items(Joi.string()).single(),
  saves: Joi.array().items(Joi.string()),
  plays: Joi.number().default(0),
  user: Joi.string(),
  category: Joi.string(),
  viewcount: Joi.number(),
  imageUrl: Joi.string(),
  orniginalimg: Joi.string().default('https://res.cloudinary.com/dx0hz2ziy/imag'),
  cards: Joi.array().items(
    Joi.object({
      term: Joi.string(),
      position: Joi.number(),
      imageUrl: Joi.string(),
      image: Joi.string(),
      definition: Joi.string(),
    })
  ).required(),
});
module.exports = { quizCardSchema };


// const signupShcema = Joi.object({
//   username: Joi.string().min(3).max(50).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).max(50).required(),
//   confirmPassword: Joi.string().min(8).max(50).required(),
// });
// module.exports = { signupShcema };

// const loginSchema = Joi.object({
//   username: Joi.string().min(3).max(50).required(),
//   password: Joi.string().min(8).max(50).required(),
// });

// module.exports = { loginSchema };