const express = require("express");
const router = express.Router();
const { authController, adminAuth } = require("../middleware/auth");
const multer = require("multer");
const {
  uploadCompanyPhotoController,
  createCompanyController,
  getSingleCompanyController,
  getAllCompanyController,
  getAllCompanyByAdminController,
  updateCompanyController,
  deleteSingleCompanyController,
  sortCompanyController,
  addAlumniToCompanyController,
  searchAlumniController,
} = require("../controllers/companyController");

const photoMiddleware = multer({ dest: "uploads/" });

router.post(
  "/uploadCompanyPhoto",
  photoMiddleware.array("photos"),
  uploadCompanyPhotoController
);

router.post(
  "/create-company",
  authController,
  adminAuth,
  createCompanyController
);

router.get("/get-all-companies", getAllCompanyController);

router.get("/sort-companies", sortCompanyController);

router.get("/get-single-company/:id", getSingleCompanyController);

router.get("/single-admin-company/:id", getAllCompanyByAdminController);

router.post(
  "/add-alumni/:id",
  authController,
  adminAuth,
  addAlumniToCompanyController
);

router.get("/search-alumni", searchAlumniController);

router.put(
  "/update-company/:id",
  authController,
  adminAuth,
  updateCompanyController
);

router.delete("/delete-company/:id", deleteSingleCompanyController);

module.exports = router;
