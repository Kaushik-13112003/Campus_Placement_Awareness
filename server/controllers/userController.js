const userModel = require("../models/userModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { hashPasswordFunc, normalPassword } = require("../helper/password");
const messageModel = require("../models/messageModel");

const uploadPhotoController = async (req, res) => {
  try {
    const file = req.file;

    const { originalname, path } = file;
    let splitExt = originalname.split(".");
    let ext = splitExt[splitExt.length - 1];
    let newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    newPath = newPath.replace("uploads\\", "");

    res.status(200).json({ photo: newPath });
  } catch (err) {
    console.log(err);
  }
};

const registerController = async (req, res) => {
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
    const isExist = await userModel.findOne({ email: email });

    if (isExist) {
      return res.status(400).json({ message: "E-Mail already Exists" });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;

      if (email) {
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid E-Mail Format" });
        } else {
          password = await hashPasswordFunc(password);
          let newUser;
          if (role === "Alumni") {
            if (!phoneRegex.test(whatsAppNumber)) {
              return res.status(400).json({ message: "Invalid Mobile " });
            }
            newUser = new userModel({
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
          } else {
            newUser = new userModel({
              name,
              email,
              password,
              role,
              photo,
            });
          }

          await newUser.save();
          return res.status(200).json({ message: " Regisered Successfully" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email) {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid E-Mail Format" });
      }
    }
    //verify email & password
    const verify = await userModel.findOne({ email: email });

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

//get single user
const getSingleUserController = async (req, res) => {
  try {
    let { id } = req.params;

    const findUser = await userModel.findById(id);

    if (findUser) {
      return res.status(200).json({ findUser: findUser });
    } else {
      return res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//update user
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    let { photo, name, currentCompany, currentRole, linkedInUrl, role } =
      req.body;
    let updateUser;
    if (role === "Alumni") {
      updateUser = await userModel.findByIdAndUpdate(
        { _id: id },
        { photo, name, currentCompany, currentRole, linkedInUrl },
        { new: true }
      );
    } else {
      updateUser = await userModel.findByIdAndUpdate(
        { _id: id },
        { photo, name },
        { new: true }
      );
    }

    await updateUser.save();
    return res
      .status(200)
      .json({ message: " Updated Successfully", loginData: updateUser });
  } catch (err) {
    console.log(err);
  }
};

//delete user
const deleteSingleUserController = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteUser = await userModel.findByIdAndDelete({ _id: id });

    // await deleteUser.save();
    return res.status(200).json({ message: " Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
};

//get image
const getSingleUserImageController = async (req, res) => {
  try {
    let { id } = req.params;

    let findPhoto = await userModel.findOne({ _id: id }).select("photo");
    if (findPhoto.photo.data) {
      return res.status(200).send(findPhoto.photo.data);
    } else {
      return res.status(400).json({ message: "Photo not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

// get-single-user
const getUserDataController = async (req, res) => {
  try {
    let { id } = req.query;

    if (!id) {
      return;
    }

    const singleUser = await userModel.findById(id);
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

// get-single-user
const getAllChatsController = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return;
    }

    const allChats = await messageModel.find({ userId: id }).populate("userId alumniId", "name"); // Populate user and alumni data if needed
    console.log(allChats);

    if (allChats) {
      return res.status(200).json({ allChats: allChats });
    } else {
      return res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerController,
  loginController,
  deleteSingleUserController,
  updateUserController,
  getSingleUserController,
  getSingleUserImageController,
  getUserDataController,
  uploadPhotoController,
  getAllChatsController,
};
