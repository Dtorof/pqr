import {  DataTypes } from "sequelize";
import { db } from "../db/db.js";
import { Pqrc } from './pqrCategory.model.js'

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


        Response.belongsTo(Pqrc, {foreignKey: 'register_pqr_id', sourceKey: 'id'});
        Pqrc.hasMany(Register, {foreignKey: 'register_pqr_id', targetId: 'id'}); 