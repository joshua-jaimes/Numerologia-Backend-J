import * as LecturasModel from '../models/lecturasModel.js';
import * as UsuariosModel from '../models/usuariosModel.js';
import * as PagosModel from '../models/pagosModel.js';
import { generarLecturaDiaria, generarLecturaPrincipal } from '../utils/aiSimulator.js';
import dayjs from 'dayjs';

export async function generarPrincipal(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);
    const usuario = await UsuariosModel.obtenerUsuarioPorId(usuario_id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    const ya = await LecturasModel.existeLecturaPrincipal(usuario_id);
    if (ya) return res.status(400).json({ message: 'La lectura principal ya fue generada para este usuario' });

    const contenido = generarLecturaPrincipal(usuario.fecha_nacimiento, usuario.nombre);
    const lectura = await LecturasModel.crearLectura({ usuario_id, tipo: 'principal', contenido });
    res.status(201).json(lectura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function generarDiaria(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);
    const usuario = await UsuariosModel.obtenerUsuarioPorId(usuario_id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    
    if (usuario.estado !== 'activo') {
      return res.status(403).json({ message: 'Usuario inactivo: necesita una membresía activa para lecturas diarias' });
    }

    
    const fecha_vencimiento = await PagosModel.obtenerEstadoMembresia(usuario_id);
    const hoy = dayjs();
    if (!fecha_vencimiento || dayjs(fecha_vencimiento).isBefore(hoy)) {
      
      await UsuariosModel.cambiarEstadoUsuario(usuario_id, 'inactivo');
      return res.status(403).json({ message: 'Membresía vencida. Usuario marcado como inactivo.' });
    }

    const contenido = generarLecturaDiaria(usuario.nombre);
    const lectura = await LecturasModel.crearLectura({ usuario_id, tipo: 'diaria', contenido });
    res.status(201).json(lectura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function lecturasPorUsuario(req, res) {
  try {
    const usuario_id = Number(req.params.usuario_id);
    const lecturas = await LecturasModel.obtenerLecturasPorUsuario(usuario_id);
    res.json(lecturas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function lecturaPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const lectura = await LecturasModel.obtenerLecturaPorId(id);
    if (!lectura) return res.status(404).json({ message: 'Lectura no encontrada' });
    res.json(lectura);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}









