const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const schemes = require('../models/mongoose');

module.exports.signUp = async (res, parameters) => {
  
  const {
    password,
    passwordConfirmation,
    email,
    username,
    name,
    lastName,
  } = parameters;

  if (password === passwordConfirmation) {

    try {
      const checkUser = await schemes.User.findOne({"email":email})
      if(checkUser)
        {
          return res.status(400).json({
            status: 400,
            message: "User already exists",
          });
        }
      else
      {
        const newUser = schemes.User({
          password: Bcrypt.hashSync(password, 10),
          email,
          username,
          name,
          lastName,
        });
    
        try {
          const savedUser = await newUser.save();
    
          const token = jwt.sign(
            { email, id: savedUser.id, username },
            config.API_KEY_JWT,
            { expiresIn: config.TOKEN_EXPIRES_IN }
          );
    
          return res.status(201).json({ token });
        } catch (error) {
          return res.status(400).json({
            status: 400,
            message: error,
          });
        }
      }
      
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }

    
  }

  return res.status(400).json({
    status: 400,
    message: 'Passwords are different, try again!!!',
  });
};

module.exports.logIn = async (res, parameters) => {
  
  const {
    password,
    email
  } = parameters;

    try {
      const checkUser = await schemes.User.findOne({"email":email})
      
      if(checkUser)
        {
          if(checkUser.password==password)
            {
              //give login credentials....
            }
            else
            {
              return res.status(400).json({
                status: 400,
                message: "Login credentials doesnot match.",
              });
            }
          
        }
      else
      {
        return res.status(400).json({
          status: 400,
          message: 'The entered user doesnot exist.',
        });
      }
      
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
};
