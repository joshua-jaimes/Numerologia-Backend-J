import {
  obtenerPagos,
   obtenerPagosId,
  crearPago,
  obtenerEstadoID,


  
} from '../models/pagosModel.js';  


export async function getPagos(req, res){
    try{
      const obtener = await obtenerPagos()
      res.status(200).json(obtener)
    }
    catch(error){
      res.status(400).json({ error:'no se obtuvieron datos'})
    }
}



export async function getPagosId(req, res){
    try{
        const obtener = await obtenerPagosId(req.params.usuario_id)
        res.status(200).json(obtener)
    }
    catch(error){
        res.status(400).json({error:'error al obtener usuario'});
    }
}




      export async function  getPagosEstadoId(req, res){
        try{

            const estadoId = await obtenerEstadoID(req.params.id)
            res.status(200).json(estadoId)
        }
        catch(error){
            res.status(400).json({error: 'error'})


        }
      }














export async function postPagos(req, res){
    try{
const crearPagos = await crearPago(req.params.id, req.body)
res.status(200).json(crearPagos)
    }
    catch(error){
        res.status(400).json({ error: 'No se realizo el pago'})

    }
}

