
import { DataTypes } from "sequelize";

import { sequelize } from "../DB.Connection.js";

const medical_rediologyModel = sequelize.define(
    "medical_rediology",
    {
        Rid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }
    },
    {
        timestamps: true,
    }
);


export default medical_rediologyModel;
