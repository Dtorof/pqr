import  { Register } from '../models/register_pqr.model.js'



export const editRegister = async (req,res) => {
    const { id } = req.params
    try {

        const {  status } = req.body
        if(status !== 'Finalizado') {
            return res.status(500).json({ message: "El status debe ser igual a 'Finalizado' "})
        }

        const editRegister = await Register.findByPk(id)
        editRegister.status = status
        await editRegister.save()
    
        res.status(200).json({message: `Register with id:${id} was succesfully edited`, editRegister})
      } catch (err) {
        return res.status(500).json({ message: err})
      }
}