import express from "express";
import "dotenv/config"

import usuarioRoutes  from './routes/usuarioRoutes.js' ;
import pagosRoutes from "./routes/pagosRoutes.js";
import lecturasRoutes from "./routes/lecturasRoutes.js";



const app = express()

app.use(express.json())

app.use( "/api/usuarios", usuarioRoutes );
app.use( "/api/pagos", pagosRoutes );
app.use("/api/lecturas", lecturasRoutes);




app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));
