const {User} = require("../models/users");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const sendotp = require("../controller/otpController");
const {OTP} = require("../models/otpModels");

const getUser = async (req,res) => {
    const user = await User.find().select("-password");
    if(!user){
        return res.status(404).json("User is not registered");
    }
    return res.status(200).json(user);
}

const getUserById = async (req,res) => {
    const {id} = req.params;
    const userById = await User.find({
        "$or" : [
            {fullName : {$regex : id}},
            {worklocation : {$regex : id}},
            {position : {$regex : id}},
        ]
    }).select("-password");
    if(!userById){
        return res.status(404).json("No record is available");
    }
    return res.status(200).json(userById);
}

const signUp = async (req,res) => {
    try{
          const errors = validationResult(req);
          if(!errors.isEmpty()){
            return res.status(409).json(errors.array());
          }
          const {fullName, email, userpassword, mobileNumber, position, workStatus, workLocation} = req.body;
          const Emailregistered = await User.findOne({email :email});
          if(Emailregistered){
            return res.status(404).json("Email is already registered.");
          }
          const numberRegistered = await User.findOne({mobileNumber :mobileNumber});
          if(numberRegistered){
            return res.status(404).json("Mobile Number is already registered.");
          }
          const passwordHash = bcrypt.hashSync(userpassword,10);
          let userRegistration = User({
            fullName : fullName,
            email : email,
            password :passwordHash,
            mobileNumber : mobileNumber,
            position : position,
            workStatus : workStatus,
            workLocation : workLocation,
          })
          userRegistration = await userRegistration.save();
          if(!userRegistration){
            return res.status(404).json("Account is not valid.");
          }
          sendotp(userRegistration,res);
    }catch(err){
        console.log(err);
        return res.status(500).json(err.message);
    }      
}

const userUpdate = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(409).json(errors.array());
    }
    const basePath  = `${req.protocol}://${req.get('host')}`;
    const photo = req.files.profile[0].filename;
    const docs = req.files.resume[0].filename;
    const user = await User.findByIdAndUpdate(req.params.id,{
        profile : `${basePath}/${photo}`,
        fullName : req.body.fullName,
        email : req.body.email,
        mobileNumber : req.body.mobileNumber,
        position : req.body.position,
        workStatus : req.body.workStatus,
        resume : `${basePath}/${docs}`,
        workLocation : req.body.workLocation,
    })
    if(!user){
        return res.status(404).json("User is not registered");
    }
    return res.status(200).json(user);
}

const userDelete = async (req,res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user){
        return next("Account is not found");
    }
    return res.status(200).json("Account is deleted.");
}

const verify = async (req,res) => {
    const { email, otp } = req.body;

  // Check if email and OTP are provided
  if (!email || !otp) {
    return res.status(404).json("All fields are required.");
  }

  // Find the stored OTP document for the given email
  const existEmployee = await OTP.findById(email);

  // Check if the OTP is expired
  if (existEmployee.expiredAt < Date.now()) {
    await OTP.findByIdAndRemove(email);
    return res.status(404).json("OTP is expired.");
  }

  // Compare the submitted OTP with the stored OTP
  const isVerify = await bcrypt.compare(otp, existEmployee.otp);
  if (!isVerify) {
    return res.status(404).json("OTP is not matched.");
  }

  // Delete the OTP from the database since it has been verified
  await OTP.findByIdAndRemove(email);

  // Update the user's verification status to 'true'
  const verification = await User.findByIdAndUpdate(
    email,
    {
      verified: true,
    },
    { new: true }
  );

  // Check if the verification update was successful
  if (!verification) {
    return res.status(404).json("Not verified.");
  }

  return res.status(200).json("Account is verified.");
};

const forgetPassword = async (req,res) => {
    const email = req.body.email;
    const user = await User.findById(email);
    if(!user){
        return res.status(404).json("User is not registered");
    }
    sendotp(email,res); 
    const verify = async (req,res) => {
        const existingUser = await OTP.findById(email);
        const dbOTP = existingUser.otp;
        //otp expired
        if(existingUser.expiredAt < createdAt){
            await OTP.findByIdAndRemove(email);
            return false;
        }
        const otp = req.body.otp;
        if(!otp){
            return res.status(404).json("All fields are required.");
        }
        const isVerify = await bcrypt.compare(otp,dbOTP);
        await OTP.findByIdAndRemove(email);
        if(!isVerify){
            return false;
        }
        return true;
    }
    if(!verify){
        return res.status(404).json("Invalid OTP.");
    }
    const passwordHash = bcrypt.hashSync(req.body.password,10);
    const passwordUpdate = await User.findByIdAndUpdate(user,{
        password : passwordHash
    })
    if(!passwordUpdate){
        return res.status(404).json("Password is Invalid.")
    }
    return res.status(200).json("Password is updated.");
}



module.exports = {getUser,getUserById,signUp,userUpdate,userDelete,forgetPassword,verify};