
import citizenModel from "../../Database/models/citizen.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";



export const createCitizen = asyncHandler(async (req, res, next) => {
  const { Nid, full_name, address, blood_type, birth_date } = req.body;

  if (!Nid || !full_name || !address || !blood_type || !birth_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existingCitizen  = await citizenModel.findOne({ where: { Nid } })

  if (existingCitizen) {
    return next(new Error("Citizen already exist"))
  }
  const citizen = await citizenModel.create({ Nid, full_name, address, blood_type, birth_date })
  return res.status(201).json({ message: "Citizen Created Successfully", citizen });
});



export const findAllCitizen = asyncHandler(async (req, res, next) => {
  const citizen = await citizenModel.findAll()
  return res.status(201).json({ message: "Citizen Created Successfully", citizen });
});


export const findCitizenByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const citizen = await citizenModel.findByPk(id)
  if (!citizen) {
    return next(new Error("Citizen not found", { cause: 404 }))
  }
  return res.status(201).json({ message: "Citizen Created Successfully", citizen });
});



export const updateCitizen = asyncHandler(async (req, res, next) => {

  const { id } = req.params
  const citizen = await citizenModel.findByPk(id)
  if (!citizen) {
    return next(new Error("Citizen not found", { cause: 404 }))
  }
  await citizen.update(req.body)
  return res.status(201).json({ message: "Citizen Updated Successfully", citizen });
});


export const deleteCitizen = asyncHandler(async (req, res, next) => {

  const { id } = req.params
  const citizen = await citizenModel.findByPk(id)
  if (!citizen) {
    return next(new Error("Citizen not found", { cause: 404 }))
  }
  await citizen.destroy({ id: id })
  return res.status(201).json({ message: "Citizen Deleted Successfully", citizen });
});
