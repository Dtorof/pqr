import {  DataTypes } from "sequelize";
import { db } from "../db/db.js";
// import { ProductCategory } from './product_category.model.js'

const { STRING, INTEGER } = DataTypes

export const Traceability = db.define('traceability',{ 
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        register_pqr_id:{
            type: INTEGER,
            allowNull: true
        },  
        date: {
            type: STRING,
            allowNull: true
        },
        update:{
            type: STRING,
            allowNull: true
        }
        })


        
        