import  { Traceability } from '../models/traceability.model.js'


export const getTraceability = async (req,res) => {
    try{
        const list = await Traceability.findAll({ include: { all: true }})
        res.json(list)
    }catch(err){
        console.log(err);
    }
}

export const traceabilityById = async (req,res) => {
    const { id } = req.params
    try{
        const itemId = await Traceability.findOne({
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

export const createTraceability = async  (req,res) => {

    try {
    
    const { register_pqr_id, novelty } = req.body
    
    const today = new Date()
    
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    let dateNow = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear()
    let date = `${dateNow} ${time}`
    
    const createRegister = await Traceability.create({
        register_pqr_id, date, novelty
    })
    res.status(200).json({message: "Register was created succesfully", createRegister})

    } catch (error) {
        console.error(error)
    }
    
}

export const deleteTraceability = async (req,res) => {
    const { id } = req.params
    try{
         await Traceability.destroy({
            where: {
                id
            }
        })
         res.status(200).json({message: `Register with id:${id} was succesfully removed`})
       }catch(err){
            console.error(err)
       }
}

export const editTraceability = async (req,res) => {
    const { id } = req.params
    try {

        const { register_pqr_id, date, novelty } = req.body
    
        const editRegister = await Traceability.findByPk(id)
        editRegister.register_pqr_id = register_pqr_id
        editRegister.date = date
        editRegister.novelty = novelty
        await editRegister.save()
    
        res.status(200).json({message: `Register with id:${id} was succesfully edited`, editRegister})
      } catch (err) {
        return res.status(500).json({ message: err})
      }
}