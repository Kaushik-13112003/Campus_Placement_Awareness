const jwt = require("jsonwebtoken");
const { hashPasswordFunc, normalPassword } = require("../helper/password");
const alumniModel = require("../models/alumniModel");

const alumniRegisterController = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      role,
      photo,
      whatsAppNumber,
      currentCompany,
      currentRole,
      linkedInUrl,
    } = req.body;

    //isExist
    const isExist = await alumniModel.findOne({ email: email });

    if (isExist) {
      return res.status(400).json({ message: "E-Mail already Exists" });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;

      if (email) {
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid E-Mail Format" });
        } else {
          if (!phoneRegex.test(whatsAppNumber)) {
            return res.status(400).json({ message: "Invalid Mobile " });
          }
          password = await hashPasswordFunc(password);

          const newUser = new alumniModel({
            name,
            email,
            password,
            role,
            photo,
            whatsAppNumber,
            currentCompany,
            currentRole,
            linkedInUrl,
          });

          await newUser.save();
          return res.status(200).json({ message: " Regisered Successfully" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const alumniLoginController = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email) {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid E-Mail Format" });
      }
    }
    //verify email & password
    const verify = await alumniModel.findOne({ email: email });

    if (verify.role !== role) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    if (password && email) {
      if (verify) {
        //decode password
        let isMatch = await normalPassword(password, verify.password);
        const token = await jwt.sign({ _id: verify._id }, process.env.TOKEN, {
          expiresIn: "7d",
        });

        if (isMatch) {
          return res.status(200).json({
            message: "Login Successfully",
            loginData: verify?._id,
            token: token,
          });
        } else {
          return res.status(400).json({ message: "Wrong Credentials" });
        }
      } else {
        return res.status(400).json({ message: "Wrong Credentials" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//update user
const updateAlumniController = async (req, res) => {
  try {
    const { id } = req.params;
    let { photo, name, linkedInUrl, currentCompany, currentRole } = req.body;

    const updateUser = await alumniModel.findByIdAndUpdate(
      { _id: id },
      { photo, name, linkedInUrl, currentCompany, currentRole },
      { new: true }
    );

    await updateUser.save();
    return res
      .status(200)
      .json({ message: " Updated Successfully", loginData: updateUser });
  } catch (err) {
    console.log(err);
  }
};

// get alumni user
const getAlumniDataController = async (req, res) => {
  try {
    let { id } = req.query;

    if (!id) {
      return;
    }

    const singleUser = await alumniModel.findById(id);
    console.log(singleUser);

    if (singleUser) {
      return res.status(200).json({ singleUser: singleUser });
    } else {
      return res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  alumniRegisterController,
  alumniLoginController,
  updateAlumniController,
  getAlumniDataController
};
