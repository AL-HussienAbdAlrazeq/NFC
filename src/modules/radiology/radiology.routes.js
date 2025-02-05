import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";

import { upload } from "../../utils/multer/uploadImage.js";
import { createRadiology, deleteRadiology, findAllRadiology, findRadiologyByID, updateRadiology } from "./radiology.controller.js";
import { updateCitizenValidation } from "./radiology.validation.js";

const radiologyRouter = Router()

radiologyRouter.post('/create-radiology', upload.single('image'), createRadiology)
radiologyRouter.get('/', findAllRadiology)
radiologyRouter.get('/:id', findRadiologyByID)
radiologyRouter.patch('/update-citizen/:id',upload.single('image'), updateRadiology)
radiologyRouter.delete('/delete-citizen/:id', deleteRadiology)






export default radiologyRouter