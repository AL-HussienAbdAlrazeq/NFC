
import citizenModel from "../../Database/models/citizen.model.js";
import radiology_Model from "../../Database/models/radiology.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";

import { cloud } from "../../utils/multer/cloudinary.multer.js"


export const createRadiology = asyncHandler(async (req, res, next) => {
  const { citizenNid, radiology_type, radiologistNotes, radiology_date } = req.body;


  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded!' });
  }

  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, {
    folder: 'NFC/Radiology_Image',
    resource_type: 'auto', // ✅ Allows DICOM & other formats
  });

  const newRadiology = await radiology_Model.create({
    citizenNid,
    radiology_type,
    radiologistNotes,
    radiology_date,
    image_url: secure_url,
    image_public_id: public_id,
  });

  return res.json({ message: 'Radiology created successfully!', data: newRadiology });
});



export const findAllRadiology = asyncHandler(async (req, res, next) => {
  const radiology = await radiology_Model.findAll()
  return res.status(201).json({ message: "Radiology Created Successfully", radiology });
});


export const findRadiologyByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const radiology = await radiology_Model.findByPk(id)
  if (!radiology) {
    return next(new Error("Radiology not found", { cause: 404 }))
  }
  return res.status(201).json({ message: "Radiology Created Successfully", radiology });
});



export const updateRadiology = asyncHandler(async (req, res, next) => {
  const { citizenNid, radiology_type, radiologistNotes, radiology_date } = req.body;
  const { secure_url, public_id } = await cloud.uploader.upload(req.file.path, { folder: "NFC/Radiology_Image" });
  const { id } = req.params
  const radiology = await radiology_Model.findByPk(id)
  if (!radiology) {
    return next(new Error("Radiology not found", { cause: 404 }))
  }
  await radiology.update({ citizenNid, radiology_type, radiologistNotes, radiology_date , image_url: secure_url, image_public_id: public_id})
  return res.status(201).json({ message: "Radiology Updated Successfully", radiology });
});


export const deleteRadiology = asyncHandler(async (req, res, next) => {

  const { id } = req.params
  const radiology = await radiology_Model.findByPk(id)
  if (!radiology) {
    return next(new Error("Radiology not found", { cause: 404 }))
  }
  await radiology.destroy({ id: id })
  return res.status(201).json({ message: "Radiology Deleted Successfully", radiology });
});
