import { Router } from 'express';

import{
     getUsuarios,
     getUsuarioId,
     postUsuario,
     putUsuario,
     patchUsuario,
   deleteUsuario
} from "../controllers/usuarioControllers.js";

const router = Router();

 router.get("/",getUsuarios);
router.get("/:id",getUsuarioId);
router.post("/",postUsuario);
 router.put("/:id",putUsuario);
 router.patch("/:id",patchUsuario)
 router.delete("/:id",deleteUsuario);

export default router;







































