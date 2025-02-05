
import { DataTypes } from "sequelize";


import { sequelize } from "../DB.Connection.js";
import citizenModel from "./citizen.model.js";

const medical_recordModel = sequelize.define(
    "medical_record",
    {
        Mid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        treatment: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        diagnosis:
        {
            type: DataTypes.JSON,
            allowNull: false,
        }
        ,
        record_date: { type: DataTypes.DATE , defaultValue:DataTypes.NOW}
    },
    {
        timestamps: true,
    }
);
citizenModel.hasMany(medical_recordModel)
medical_recordModel.belongsTo(citizenModel)
export default medical_recordModel;
