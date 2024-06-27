const UserToken = require("../models/userTokenModel")
const { signAccessToken, signRefreshToken } = require("./jwt_helper")

const generateToken = async (id) => {
  try{
    const accessToken = await signAccessToken(id)
    const refreshToken = await signRefreshToken(id)

    await new UserToken({userId: id, token: refreshToken}).save();
    
    return Promise.resolve({accessToken, refreshToken})

  } catch(error){
    if(error){
      return Promise.reject(error)
    }
  }
}

module.exports = generateToken