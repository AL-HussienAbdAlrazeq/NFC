
import { DataTypes } from "sequelize";
import { sequelize } from "../DB.Connection.js";
import citizenModel from "./citizen.model.js";

const radiology_Model = sequelize.define(
    "radiology",
    {
        Rid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        radiology_type: {
            type: DataTypes.ENUM("X-Ray", "MRI", "CT Scan", "Ultrasound"),
            allowNull: false,
        },
        radiologistNotes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING, // Store multiple images as an array [{secure_url, public_id}]
            allowNull: true,
        },

        image_public_id: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        radiology_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: true,
    }
);


citizenModel.hasMany(radiology_Model)
radiology_Model.belongsTo(citizenModel)


export default radiology_Model;
