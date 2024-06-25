import bcrypt from "bcrypt"

const encryptPassword = async function(rawPassword){
    // returns a hashed string 
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(rawPassword, salt)

}

const decryptPassword = async function(passwordFromRequest, passwordHashFromDB){
    return await bcrypt.compare(passwordFromRequest, passwordHashFromDB)
}

export {encryptPassword, decryptPassword}