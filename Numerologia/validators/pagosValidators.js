export async function registrarPago(req, res) {
  try {
    const { usuario_id, monto, metodo } = req.body;

    // 1. Validar usuario existente
    const usuario = await UsuariosModel.obtenerUsuarioPorId(usuario_id);
    if (!usuario)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    // 2. Campos obligatorios
    if (!usuario_id || !monto || !metodo)
      return res.status(400).json({ message: 'Faltan datos para registrar el pago' });

    // 3. Método válido
    const metodosValidos = ['tarjeta', 'efectivo', 'transferencia'];
    if (!metodosValidos.includes(metodo))
      return res.status(400).json({ message: 'Método de pago inválido' });

    // 4. Monto válido
    if (typeof monto !== 'number' || monto <= 0)
      return res.status(400).json({ message: 'Monto inválido' });

    // 5. Crear pago + fecha vencimiento
    const hoy = dayjs().format('YYYY-MM-DD');
    const fecha_vencimiento = dayjs().add(30, 'day').format('YYYY-MM-DD');

    const pago = await PagosModel.registrarPago({
      usuario_id,
      monto,
      fecha_pago: hoy,
      fecha_vencimiento,
      metodo,
    });

    // 6. Activar usuario automáticamente
    await UsuariosModel.cambiarEstadoUsuario(usuario_id, 'activo');

    res.status(201).json({
      pago,
      message: `Pago registrado. Usuario activo hasta ${fecha_vencimiento}`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
