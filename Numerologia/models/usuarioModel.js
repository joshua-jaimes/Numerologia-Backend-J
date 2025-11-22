import pool from '../config/db.js';

export async function obtenerUsuarios(){
  const [rows] = await pool.query('select * from usuarios')
    return rows;
}

export async function obtenerUsuarioPorId(id){
    const [UsuarioId] = await pool.query('select * from usuarios where id = ?',
    [id])
    return [UsuarioId]
    
  
;}





export async function crearUsuario({ nombre, email, fecha_nacimiento, estado }) {
  
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, email, fecha_nacimiento, estado, fecha_registro)
     VALUES (?, ?, ?, ?, NOW())`,
    [nombre, email, fecha_nacimiento, estado]
  );

  return {
    id: result.insertId,
    nombre,
    email,
    fecha_nacimiento,
    estado,
    fecha_registro: new Date()
  };
}


export async function actualizarUsuario(id, {nombre,email,fecha_nacimiento,estado}){

  const actualizar = await pool.query (
    'update Usuarios set nombre = ?,email = ?,fecha_nacimiento = ?,estado = ? where id = ?',
    [nombre,email,fecha_nacimiento,estado,id]
  )
  
return actualizar


}




export async function cambiarEstado(id, estado){

  const estados = await pool.query(
    'UPDATE usuarios SET estado = ? WHERE id = ?',[estado,id]
  )
  return estados;

}
















export async function eliminarUsuario(id){

  const Resultado = await pool.query('delete from Usuarios where id = ?',
  [id]
  )

  return Resultado

}


