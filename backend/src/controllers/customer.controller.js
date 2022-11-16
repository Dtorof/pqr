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
    try{
        let { names,surnames,document,fullName, dateOfBirth,age,address,phone} = req.body
    
        fullName = `${names} ${surnames}`
        const getAge = dateOfBirth => Math.floor((new Date() - new Date(dateOfBirth).getTime()) / 3.15576e+10)
        age =getAge(dateOfBirth)
        
    const createCustomer= await Customer.create({
        names,email ,surnames,fullName,dateOfBirth,age, document,address,phone
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
        let { names, surnames,fullName, dateOfBirth,age,address,phone } = req.body
        fullName = `${names} ${surnames}`
        const getAge = dateOfBirth => Math.floor((new Date() - new Date(dateOfBirth).getTime()) / 3.15576e+10)
        age =getAge(dateOfBirth)
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