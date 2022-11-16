import {  DataTypes } from "sequelize";
import { db } from "../db/db.js";
// import { ProductCategory } from './product_category.model.js'

const { STRING, INTEGER } = DataTypes

export const Response = db.define('response',{ 
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        register_pqr_id:{
            type: INTEGER,
            allowNull: true
        },
        user_id: {
            type: INTEGER,
            allowNull: true
        },
        desc_solution:{
            type: STRING,
            allowNull: true
        }
        })


        