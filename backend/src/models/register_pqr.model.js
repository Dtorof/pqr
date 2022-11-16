import {  DataTypes } from "sequelize";
import { db } from "../db/db.js";
// import { ProductCategory } from './product_category.model.js'

const { STRING, INTEGER } = DataTypes

export const Register = db.define('register',{ 
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        client_id:{
            type: INTEGER,
            allowNull: true
        },
        user_id: {
            type: INTEGER,
            allowNull: true
        },
        pqr_category_id:{
            type: INTEGER,
            allowNull: true
        },
        date_register:{ 
            type: STRING,
            allowNull: true
        },
        description:{ 
            type: STRING,
            allowNull: true
        },
        status:{ 
            type: STRING,
            allowNull: true,
            defaultValue: 'En proceso'
        }
        })


        // Register.belongsTo(PqrCategory, {foreignKey: 'pqr_category_id', sourceKey: 'id'});
        // PqrCategory.hasMany(Register, {foreignKey: 'pqr_category_id', targetId: 'id'});
        