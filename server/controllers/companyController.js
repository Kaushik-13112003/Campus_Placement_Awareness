const fs = require("fs");
const companyModel = require("../models/companyModel");
const userModel = require("../models/userModel");

const uploadCompanyPhotoController = async (req, res) => {
  try {
    const files = req.files;
    const uploadedPhots = [];

    for (let i = 0; i < files.length; i++) {
      const { originalname, path } = req.files[i];
      let splitExt = originalname.split(".");
      let ext = splitExt[splitExt.length - 1];
      let newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      newPath = newPath.replace("uploads\\", "");
      uploadedPhots.push(newPath);
    }
    res.status(200).json({ photos: uploadedPhots });
  } catch (err) {
    console.log(err);
  }
};

const createCompanyController = async (req, res) => {
  let {
    name,
    type,
    about,
    address,
    city,
    state,
    postalCode,
    country,
    department,
    photos,
    properties,
  } = req.body;
  try {
    if (
      !name ||
      !state ||
      !city ||
      !postalCode ||
      !country ||
      !address ||
      !about ||
      !type ||
      !department ||
      photos.length <= 0 ||
      properties.length <= 0
    ) {
      return res.status(404).json({ msg: "complete the fields" });
    }

    const newCompany = new companyModel({
      ...req.body,
      admin: req.userId,
    });

    await newCompany.save();
    return res.status(200).json({ msg: " company added successfully" });
  } catch (err) {
    console.log(err);
  }
};

//get all compnay
const getAllCompanyController = async (req, res) => {
  try {
    const allCompanies = await companyModel
      .find()
      .sort({ createdAt: -1 })
      .populate("admin", ["role"]);

    if (allCompanies) {
      return res.status(200).json({ allCompanies: allCompanies });
    } else {
      return res.status(400).json({ msg: "company not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get all compnay by admin
const getAllCompanyByAdminController = async (req, res) => {
  let { id } = req.params;
  try {
    const allCompanies = await companyModel
      .find({ admin: id })
      .sort({ createdAt: -1 })
      .populate("admin", ["role"]);

    if (allCompanies) {
      return res.status(200).json({ allCompanies: allCompanies });
    } else {
      return res.status(400).json({ msg: "company not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get single compnay
const getSingleCompanyController = async (req, res) => {
  try {
    let { id } = req.params;

    const singleCompany = await companyModel.findById(id);

    let findAlumnies = await userModel.find({ _id: singleCompany?.alumni });
    // console.log(findAlumnies);

    if (singleCompany) {
      return res
        .status(200)
        .json({ singleCompany: singleCompany, findAlumnies: findAlumnies });
    } else {
      return res.status(400).json({ message: "company not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//sort compnay
const sortCompanyController = async (req, res) => {
  try {
    let { department } = req.query;
    let decodedDepartment = decodeURIComponent(department);
    console.log(decodedDepartment);

    let allCompanies;

    if (decodedDepartment === "All") {
      allCompanies = await companyModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ allCompanies: allCompanies });
    }

    allCompanies = await companyModel.find({ department: decodedDepartment });

    if (allCompanies) {
      return res.status(200).json({ allCompanies: allCompanies });
    } else {
      return res.status(400).json({ message: "company not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateCompanyController = async (req, res) => {
  const { id } = req.params;
  let {
    name,
    type,
    about,
    address,
    city,
    state,
    postalCode,
    country,
    photos,
    properties,
  } = req.body;

  if (
    !name ||
    !state ||
    !city ||
    !postalCode ||
    !country ||
    !address ||
    !about ||
    !type ||
    photos.length <= 0 ||
    properties.length <= 0
  ) {
    return res.status(404).json({ msg: "complete the fields" });
  }

  try {
    const company = await companyModel.findById({ _id: id });

    if (company) {
      company.set({
        ...req.body,
      });

      await company.save();
      return res.status(200).json({ msg: "company updated" });
    } else {
      return res.status(400).json({ msg: "no company found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//delete company
const deleteSingleCompanyController = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteCompany = await companyModel.findByIdAndDelete({ _id: id });
    if (deleteCompany) {
      let allCompanies = await companyModel.find();
      return res
        .status(200)
        .json({ message: " deleted successfully", allCompanies: allCompanies });
    }
  } catch (err) {
    console.log(err);
  }
};

//add alumni to compnay
const addAlumniToCompanyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { alumniId } = req.body;

    const alumni = await userModel.findById({ _id: alumniId });
    if (!alumni) {
      return res.status(404).json({ msg: "Alumni not found" });
    }

    const company = await companyModel.findById({ _id: id });
    if (!company) {
      return res.status(404).json({ msg: "Company not found" });
    }

    //isExist
    if (company.alumni.includes(alumniId)) {
      return res.status(404).json({ msg: "alumni already added" });
    }

    company.alumni.push(alumni);

    await company.save();

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search alumni
const searchAlumniController = async (req, res) => {
  try {
    const { query } = req.query;
    const alumni = await userModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
      role: "Alumni",
    });

    if (alumni) {
      res.status(200).json(alumni);
    } else {
      return res.status(404).json({ msg: "alumni not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  uploadCompanyPhotoController,
  createCompanyController,
  getSingleCompanyController,
  getAllCompanyController,
  getAllCompanyByAdminController,
  searchAlumniController,
  updateCompanyController,
  deleteSingleCompanyController,
  sortCompanyController,
  addAlumniToCompanyController,
};
