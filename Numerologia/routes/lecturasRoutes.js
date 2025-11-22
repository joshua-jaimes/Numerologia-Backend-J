

import { Router } from 'express';

import{
     getlecturas,
     getPagosId,
    postPagos,
    getPagosEstadoId
    
} from "../controllers/lecturasControllers.js";

const router = Router();

 router.get("/",getlecturas);
 router.get("/:usuario_id", getPagosId);
router.post("/:id",postPagos);
router.get("/:id",getPagosEstadoId)


export default router

