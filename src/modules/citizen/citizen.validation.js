import joi from "joi"
import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const schema = Joi.date().format('YYYY-MM-DD').utc(); 
export const createCitizenValidation = joi
  .object()
  .keys({
    Nid: joi.string()
    .length(14) // Ensure exactly 14 characters
    .required()
    .messages({
      "string.base": "Nid must be a string.",
      "string.length": "Nid must be exactly 14 digits.",
      "string.pattern.base": "Nid must contain only numbers.",
      "any.required": "Nid is required."
    }),
  
  full_name: joi.string().min(3).max(100).required(),
  address: joi.string().min(5).max(255).required(),
  blood_type: joi.string().valid("A", "B", "AB", "O").required(),
  birth_date: schema,
  })
  .required();


  export const updateCitizenValidation =  joi
  .object()
  .keys({
    full_name: joi.string().min(3).max(1000),
    address: joi
      .string(),
    blood_type: joi
      .string(),
    birth_date: joi.string(),
    id:joi.number().required()
  })
  .required();