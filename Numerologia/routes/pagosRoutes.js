import { Router } from 'express';

import{
     getPagos,
     getPagosId,
    postPagos,
    getPagosEstadoId
    
} from "../controllers/pagosControllers.js";

const router = Router();

 router.get("/",getPagos);
 router.get("/:usuario_id", getPagosId);
router.post("/:id",postPagos);
router.get("/:id",getPagosEstadoId)


export default router


