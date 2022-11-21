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

          if (itemId) {
            res.json(itemId);
          } else {
            res.status(404).json({message: "El registro no existe"});
          }
        
    }catch(err){
        res.status(500).json({
            message: err,
          });
    }
}

