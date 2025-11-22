export async function crearUsuario(req, res) {
  try {
    const { nombre, email, fecha_nacimiento } = req.body;

    
    if (!nombre || !email || !fecha_nacimiento) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: 'El email no es válido' });
    }

   
    if (!dayjs(fecha_nacimiento).isValid()) {
      return res.status(400).json({ message: 'Fecha de nacimiento inválida' });
    }

  
    const existente = await UsuariosModel.obtenerUsuarioPorEmail(email);
    if (existente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const newUser = await UsuariosModel.crearUsuario({ nombre, email, fecha_nacimiento });
    res.status(201).json(newUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
