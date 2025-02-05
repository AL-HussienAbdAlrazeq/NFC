import joi from "joi"
import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const schema = Joi.date().format('YYYY-MM-DD').utc();
export const createMedicalRecordValidation = joi
  .object()
  .keys({
    treatment: joi.string().min(3).max(1000).required(),
    diagnosis: joi
      .string().required(),
    citizenNid: joi.string()
        .length(14) // Ensure exactly 14 characters
        .required()
        .messages({
          "string.base": "Nid must be a string.",
          "string.length": "Nid must be exactly 14 digits.",
          "string.pattern.base": "Nid must contain only numbers.",
          "any.required": "Nid is required."
        }).required(),
  })
  .required();


export const updateMedicalRecordValidation = joi
  .object()
  .keys({
    treatment: joi.string().min(3).max(1000).required(),
    diagnosis: joi
      .string().required(),
    id: joi.number().required()
  })
  .required();