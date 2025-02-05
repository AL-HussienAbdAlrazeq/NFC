

import citizenModel from "../../Database/models/citizen.model.js";
import medical_recordModel from "../../Database/models/medical_record.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";



export const createMedicalRecord = asyncHandler(async (req, res, next) => {
  const { treatment, diagnosis, record_date, citizenNid } = req.body;
  if (!citizenNid) {
    return next(new Error("Citizen Not Found"))
  }
  const medicalRecord = await medical_recordModel.create({ treatment, diagnosis, record_date, citizenNid })
  return res.status(201).json({ message: "Medical_Record Created Successfully", medicalRecord });
});



export const findMedicalRecord = asyncHandler(async (req, res, next) => {
  const medicalRecord = await medical_recordModel.findAll({
    include: [{
      model: citizenModel,
      as: "citizen"
    }]
  })
  return res.status(201).json({ message: "Medical_Record Created Successfully", medicalRecord });
});


export const findMedicalRecordByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const medicalRecord = await medical_recordModel.findByPk(id, {
    include: [{
      model: citizenModel,
      as: "citizen"
    }]
  })
  if (!medicalRecord) {
    return next(new Error("Medical_Record not found", { cause: 404 }))
  }
  return res.status(201).json({ message: "Medical_Record Created Successfully", medicalRecord });
});



export const updateMedicalRecord = asyncHandler(async (req, res, next) => {

  const { id } = req.params
  const medicalRecord = await medical_recordModel.findByPk(id)
  if (!medicalRecord) {
    return next(new Error("Medical_Record not found", { cause: 404 }))
  }
  await medicalRecord.update(req.body)
  return res.status(201).json({ message: "Medical_Record Updated Successfully", medicalRecord });
});


export const deleteMedicalRecord = asyncHandler(async (req, res, next) => {

  const { id } = req.params
  const medicalRecord = await medical_recordModel.findByPk(id)
  if (!medicalRecord) {
    return next(new Error("Medical_Record not found", { cause: 404 }))
  }
  await medicalRecord.destroy({ id: id })
  return res.status(201).json({ message: "Medical_Record Deleted Successfully", medicalRecord });
});
