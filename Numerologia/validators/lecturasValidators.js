export async function generarPrincipal(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);

  
    const usuario = await UsuariosModel.obtenerUsuarioPorId(usuario_id);
    if (!usuario)
      return res.status(404).json({ message: 'Usuario no encontrado' });

  
    if (!usuario.fecha_nacimiento)
      return res.status(400).json({ message: 'No hay fecha de nacimiento registrada' });

 
    const yaExiste = await LecturasModel.existeLecturaPrincipal(usuario_id);
    if (yaExiste)
      return res.status(400).json({
        message: 'La lectura principal ya fue generada para este usuario'
      });

  
    const contenido = await generarLecturaPrincipalIA(
      usuario.fecha_nacimiento,
      usuario.nombre
    );

    const lectura = await LecturasModel.crearLectura({
      usuario_id,
      tipo: 'principal',
      contenido
    });

    res.status(201).json(lectura);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
