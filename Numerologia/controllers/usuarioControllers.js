import {
   obtenerUsuarios,
   obtenerUsuarioPorId,
  crearUsuario,
  
   actualizarUsuario,
   cambiarEstado,
   eliminarUsuario,
  
} from '../models/usuarioModel.js';


export async function getUsuarios(req, res){
  try{
   const mirar = await obtenerUsuarios()
   res.status(200).json(mirar)
  }
  catch(error){
    res.status(400).json({error: "error al mostrar usuarios"})

  }
}

 export async function getUsuarioId(req, res){
  try{
    const ids = await obtenerUsuarioPorId(req.params.id)
    res.status(200).json(ids)
  }
  catch(error){
    res.status(400).json({error: 'No se puedo obtener Usuario'})
  }
 }









export async function postUsuario(req, res) {
  try {
    // 1) Desestructuramos los campos esperados del body
    const { nombre, email, fecha_nacimiento, estado } = req.body;

    // 2) Validaciones básicas
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Faltan campos requeridos: nombre y email' });
    }

    // (Opcional) Normalizar valores mínimos
    const estadoNormalizado = estado ?? 'activo'; // si no envían estado, por defecto 'activo'

    // 3) Enviamos sólo los campos esperados al modelo
    const nuevoUsuario = await crearUsuario({
      nombre,
      email,
      fecha_nacimiento: fecha_nacimiento ?? null,
      estado: estadoNormalizado
    });

    // 4) Respondemos con 201 y el usuario creado (incluye id)
    return res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: nuevoUsuario
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ error: 'Error al crear usuario' });
  }
}

export async function putUsuario(req, res){
  try{
   const actualizar = await actualizarUsuario(req.params.id, req.body)
   res.status(200).json(actualizar)
   

  }catch(error){
   res.status(400).json({ error: "error al crear el usuario"})

  }
}




export async function patchUsuario(req, res) {

  try{
  const estado = await cambiarEstado(req.params.id, req.body.estado)
  res.status(200).json(estado)
  }
  catch(error){
    res.status(400).json({error:'Error al cambiar estado'})
  }
  
}


















export async function deleteUsuario(req, res){

  try{
   const Resultado = await eliminarUsuario(req.params.id)
   res.status(200).json(Resultado )
  }
catch(error){
 res.status(400).json({error: 'error al eliminar'})
}
}














