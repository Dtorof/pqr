import { Customer} from '../models/customers.model.js'
import bcryptjs from 'bcrypt'


export const customer = async (req,res) => {
    try{
        const list = await Customer.findAll()
        res.json(list)
    }catch(err){
        console.log(err);
    }
   
}

export const customerById = async (req,res) => {
    const { id } = req.params
    try{
        const customerId = await Customer.findOne({
            where: {
              id,
            },
          });
          res.json(customerId);
    }catch(err){
        res.status(500).json({
            message: err,
          });
    }
}

export const createCustomer = async  (req,res) => {
    const salt = bcryptjs.genSaltSync();//uses the bcrypt npm package
    try{
        const { names,surnames,fullName, dateOfBirth,age,address,phone} = req.body
    if( !names || !surnames || !document || !password || age||address||phone){
        return res.status(400).json({error: "Uno o más campos vacios"})
    }
    const createCustomer= await Customer.create({
        nnamesme,surnames,fullName,dateOfBirth,age, address,phone
    })
    res.status(200).json({message: 'Customer was created succesfully', createCustomer})
    }catch(error){
        console.log(error)
    }
    
}

export const deleteCustomer = async (req,res) => {
    const { id } = req.params
    try{
         await Customer.destroy({
            where: {
                id
            }
        })
         res.status(200).json({message: `Customer with id:${id} was succesfully removed`})
       }catch(err){
            console.error(err)
       }
}

export const editCustomer = async (req,res) => {
    const { id } = req.params
    try {
        const { names,surnames,fullName, dateOfBirth,age,address,phone } = req.body
    
        const editCustomer = await Customer.findByPk(id)
        editCustomer.names = names
        editCustomer.surnames = surnames
        editCustomer.fullName = fullName
        editCustomer.dateOfBirth = dateOfBirth
        editCustomer.age = age
        editCustomer.address = address
        editCustomer.phone = phone
        await editCustomer.save()
        
        res.status(200).json({message: `Register with id:${id} was succesfully edited`, editCustomer})
      } catch (err) {
        return res.status(500).json({ message: err})
      }
}