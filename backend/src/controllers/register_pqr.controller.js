import  { Register } from '../models/register_pqr.model.js'


export const getRegisters = async (req,res) => {
    try{
        const registerList = await Register.findAll({ include: { all: true }})
        res.json(registerList)
    }catch(err){
        console.log(err);
    }
}

export const registerById = async (req,res) => {
    const { id } = req.params
    try{
        const registerId = await Register.findOne({
            where: {
              id,
            },
          });
          res.json(registerId);
    }catch(err){
        res.status(500).json({
            message: err,
          });
    }
}

export const createRegister = async  (req,res) => {

    try {
    
    const { client_id, user_id, pqr_category_id, description, status } = req.body

    const today = new Date()
    
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    let dateNow = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear()

    let date_register = `${dateNow} ${time}`

    const createRegister = await Register.create({
        client_id, user_id, pqr_category_id, date_register, description, status 
    })
    res.status(200).json({message: "Register was created succesfully", createRegister})

    } catch (error) {
        console.error(error)
    }
    
}

export const deleteRegister = async (req,res) => {
    const { id } = req.params
    try{
         await Register.destroy({
            where: {
                id
            }
        })
         res.status(200).json({message: `Register with id:${id} was succesfully removed`})
       }catch(err){
            console.error(err)
       }
}

export const editRegister = async (req,res) => {
    const { id } = req.params
    try {

        const { client_id, pqr_category_id, date_register, description, status } = req.body
    
        const editRegister = await Register.findByPk(id)
        editRegister.client_id = client_id
        editRegister.pqr_category_id = pqr_category_id
        editRegister.date_register = date_register
        editRegister.description = description
        editRegister.status = status
        await editRegister.save()
    
        res.status(200).json({message: `Register with id:${id} was succesfully edited`, editRegister})
      } catch (err) {
        return res.status(500).json({ message: err})
      }
}