import  { Response } from '../models/response_pqr.model.js'
import { Traceability } from '../models/traceability.model.js'
import { transporter } from '../helpers/configGmail.js'

export const getResponses = async (req,res) => {
    try{
        const list = await Response.findAll({ include: { all: true }})
        res.json(list)
    }catch(err){
        console.log(err);
    }
}

export const responseById = async (req,res) => {
    const { id } = req.params
    try{
        const itemId = await Response.findOne({
            where: {
              id,
            },
          });
          res.json(itemId);
    }catch(err){
        res.status(500).json({
            message: err,
          });
    }
}

export const createResponse = async  (req,res) => {

    try {
    
    const { register_pqr_id, user_id, desc_solution } = req.body
   
    const today = new Date()
    
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    let dateNow = today.getFullYear() + '-' + (today.getMonth()+1) + '-' +  today.getDate() 
    let  date_register = `${dateNow} ${time}`

    const createRegister = await Response.create({
       register_pqr_id, user_id, desc_solution
    })

    const noveltyTraceability = await Traceability.create({
        register_pqr_id, date: date_register, novelty: 'Contestado'
    })

    const info = await transporter.sendMail({
        from: '"Market Mix Team. PQR has been updated. Please, verify your process." <jorgetarifa33@gmail.com>', 
        to: 'oscar.sierra@misena.edu.co',
        subject: "PQR has been updated ✔", 
        text: "", 
        html: `
        <b> Status in your current process has been updated, please verify the changes. </b>
        `
      });

    console.log(noveltyTraceability);

    res.status(200).json({message: "Register was created succesfully", createRegister})

    } catch (error) {
        console.error(error)
    }
    
}

export const deleteResponse = async (req,res) => {
    const { id } = req.params
    try{
         await Response.destroy({
            where: {
                id
            }
        })
         res.status(200).json({message: `Register with id:${id} was succesfully removed`})
       }catch(err){
            console.error(err)
       }
}

export const editResponse = async (req,res) => {
    const { id } = req.params
    try {

        const { register_pqr_id, user_id, desc_solution } = req.body
    
        const editRegister = await Response.findByPk(id)
        editRegister.register_pqr_id = register_pqr_id
        editRegister.user_id = user_id
        editRegister.desc_solution = desc_solution
        await editRegister.save()
    
        res.status(200).json({message: `Register with id:${id} was succesfully edited`, editRegister})
      } catch (err) {
        return res.status(500).json({ message: err})
      }
}
