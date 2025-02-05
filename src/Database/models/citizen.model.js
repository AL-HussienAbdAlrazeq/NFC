import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../DB.Connection.js";

const citizenModel = sequelize.define(
    "citizen",
    {
        Nid: {
            type: DataTypes.STRING(14),
            allowNull: false,
            primaryKey: true,
            unique:true,
            validate: {
                isNumeric: true, // Ensures only numbers
                len: [14, 14],   // Ensures exactly 14 digits
            },
        },

        full_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        blood_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
    modelName: "citizen"
}
);
export default citizenModel;
